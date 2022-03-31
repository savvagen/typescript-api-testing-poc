import {JsonRequest} from "../request";
import {User} from "../../models/User";
import {BaseController, RequestParams} from "./BaseController";
import {Description, Feature, Issue, Step, Story, Tms} from "../../decorators/allure";

export class UserController extends BaseController {


    constructor(params: RequestParams) {
        super(params);
    }


    @Step()
    async getToken(credentials: {username: string, password: string}){
        return await (await new JsonRequest()
            .baseUrl(this.baseUrl).path("get_token")
            .headers({
                ...this.defaultHeaders,
                ...{ Authorization: `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`).toString("base64")}`}
            })
            .sendAssertable<any>()
        ).body().token as string
    }

    @Feature("Users Service")
    @Story("User Service: GET requests")
    @Issue("google_link", "https//google.com")
    @Tms("google_link", "https//google.com")
    @Description("<h2>Get User by ID</h2>")
    @Step("Get User by ID")
    @Step()
    async getUser(id: number|string){
        return new JsonRequest()
            .baseUrl(this.baseUrl).path("users/" + id)
            .headers(this.defaultHeaders)
            .cookieJar(this.cookies)
            .sendAssertable<User>()
    }

    @Step("Get All Users")
    async getUsers(){
        return new JsonRequest()
            .baseUrl(this.baseUrl).path("users")
            .headers(this.defaultHeaders)
            .cookieJar(this.cookies)
            .sendAssertable<User[]>()
    }

    @Step()
    async createUser(user: Omit<User, 'id'>){
        return new JsonRequest()
            .baseUrl(this.baseUrl).path("users")
            .method("POST")
            .body(JSON.stringify(user))
            .headers({
                ...this.defaultHeaders,
                ...{ Authorization: "Bearer " + this.token}
            })
            .sendAssertable<User>()
    }

}