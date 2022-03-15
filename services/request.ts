import got, {Options, RequestError, Response} from 'got';
import {AssertableResponse} from "./response";
import {CookieJar} from "tough-cookie";
import {allureErrorHook, allureRequestHook, allureResponseHook, requestAttachment} from "../utils/allure";
import {allure} from "allure-mocha/runtime";
import {ContentType, Status} from "allure-js-commons";


export class JsonRequest {
    private options: any = {
        responseType: "json",
        //method: "GET" // default method is "GET"
        //prefixUrl: "base_url", // Set BASE_URL here..
        hooks: {
            beforeRequest: [
                (options: Options)=> {
                    console.log(`Request: ${options.method} ${options.url}`)
                },
                (options: Options) => allureRequestHook(options)
            ],
            afterResponse: [
                (response: Response)=> {
                    console.log(`Response: ${response.statusCode} ${response.statusMessage}\n--------`);
                    return response
                },
                (response: Response) => allureResponseHook(response)
            ],
            beforeError: [
                (error: RequestError) => {
                    console.log("got error: " + error.name); return error
                },
                (error: RequestError) => allureErrorHook(error)
            ]
        }
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

    method(method: string){
        this.options.method = method
        return this
    }

    body(body: any = {}){
        this.options.body = body
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