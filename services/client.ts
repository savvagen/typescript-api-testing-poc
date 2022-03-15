import {promisify} from 'util';
import {PostController} from "./controllers/PostController";
import {UserController} from "./controllers/UserController";
import {CookieJar} from 'tough-cookie';
import {CONFIG} from "../config/npmConfig";
import {PetController} from "./controllers/PetController";

const BASE_URL = CONFIG.get("BASE_URL", "http://localhost:3001/api")

export class ApiClient {

    public readonly posts: PostController
    public readonly users: UserController
    public readonly pets: PetController

    constructor(params?: { baseUrl: string | undefined, token?: string | undefined, cookies?: CookieJar }) {
        const defParams = {
            baseUrl: BASE_URL,
            cookies: new CookieJar(),
            token: undefined
        }
        const mergedParam = {
            ... defParams,
            ... params
        }
        this.users = new UserController(mergedParam)
        this.posts = new PostController(mergedParam)
        this.pets = new PetController(mergedParam)
    }

    /**
     * returns ApiClient with a new token authorization
     * @param credentials
     */
    static async loginAs(credentials: {username: string, password: string}){
        return new ApiClient({
            baseUrl: BASE_URL,
            token: await new ApiClient().users.getToken(credentials)
        });
    }

}