import {JsonRequest} from "../request";
import {User} from "../../models/User";
import {BaseController} from "./BaseController";
import {CookieJar} from "tough-cookie";
import {allureRequestHook} from "../../utils/allure";


export class UserController extends BaseController {


    constructor(params: { baseUrl: string | undefined; token?: string | undefined; cookies?: CookieJar }) {
        super(params);
    }

    async getToken(credentials: {username: string, password: string}){
        return await (await new JsonRequest()
            .baseUrl(this.baseUrl).path("get_token")
            .headers({
                ...this.defaultHeaders,
                ...{ Authorization: `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`).toString("base64")}`}
            })
            .send<any>()
        ).body.token as string
    }


    async getUser(id: number|string){
        return new JsonRequest()
            .baseUrl(this.baseUrl).path("users/" + id)
            .headers(this.defaultHeaders)
            .cookieJar(this.cookies)
            .send<User>()
    }

    async getUsers(){
        return new JsonRequest()
            .baseUrl(this.baseUrl).path("users")
            .headers(this.defaultHeaders)
            .cookieJar(this.cookies)
            .sendAssertable<User[]>()
    }


    async createUser(user: Omit<User, 'id'>){
        return new JsonRequest()
            .baseUrl(this.baseUrl).path("users")
            .method("POST")
            .body(JSON.stringify(user))
            .headers({
                ...this.defaultHeaders,
                ...{ Authorization: "Bearer " + this.token}
            })
            .send<User>()
    }








}