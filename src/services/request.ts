import got, {BeforeRequestHook, Method, Options, RequestError, Response} from 'got';
import {CookieJar} from "tough-cookie";
import {AssertableResponse} from "./response";
import {allureRequestHook, allureResponseHook} from "../hooks/allure";
import {options} from "tsconfig-paths/lib/options";


export class JsonRequest {

    private options: any = {
        responseType: "json",
        hooks: {
            beforeRequest: [
                (options: Options) => { console.log(`Request: ${options.method} ${options.prefixUrl}${options.url}`) },
                (options: Options) => allureRequestHook(options),
            ],
            afterResponse: [
                (resp: Response) => allureResponseHook(resp),
                (resp: Response) => { console.log(`Response: ${resp.url} ${resp.statusCode}-${resp.statusMessage}`); return resp },
            ]
        },
        throwHttpErrors: false
    }

    baseUrl(url: string | undefined){
        this.options.prefixUrl = url
        return this
    }

    path(path: string | undefined){
        this.options.url = path
        return this
    }

    query(params: any = {}){
        this.options.searchParams = new URLSearchParams(params)
        return this
    }

    headers(headers: any = {}){
        this.options.headers = headers
        return this
    }

    cookieJar(cookies: CookieJar | undefined){
        this.options.cookieJar = cookies
        return this
    }

    method(method: Method){
        this.options.method = method
        return this
    }

    body(body: any = {}){
        this.options.body = body
        return this
    }

    beforeRequestHook(hook: Function){
        this.options.hooks.beforeRequest.push(hook)
        return this
    }

    async send<T = any>()  {
        return got<T>(this.options)
        //return got<any>(this.options)
        //...
        // Using Assertable Response
        //return new AssertableResponse(await got(this.options))
    }

    async sendAssertable<T = any>(){
        //return new AssertableResponse(await got<any>(this.options))
        return new AssertableResponse<T>(await got<T>(this.options))
    }

}