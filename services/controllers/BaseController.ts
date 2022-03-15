import {CookieJar} from "tough-cookie";

export abstract class BaseController {
    public readonly baseUrl: string | undefined
    public token: string | undefined
    public cookies: CookieJar | undefined

    public readonly defaultHeaders = {
        'Accept': "application/json",
        'Content-Type': 'application/json'
    }

    protected constructor(params: {baseUrl: string|undefined, token?: string|undefined, cookies?: CookieJar}) {
        this.baseUrl = params.baseUrl
        this.token = params.token
        this.cookies = params.cookies
    }

    refreshToken(token: string|undefined){
        this.token = token
    }

}