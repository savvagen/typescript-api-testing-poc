import got from 'got';
import {AssertableResponse} from "./response";

export class JsonRequest {
    private options: any = {
        responseType: "json",
        //method: "GET" // default method is "GET"
        //prefixUrl: "base_url", // Set BASE_URL here..
    }

    baseUrl(url: string | undefined){
        this.options.url = url
        return this
    }

    path(path: string | undefined){
        this.options.url = `${this.options.url}${path}`
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

    method(method: string){
        this.options.method = method
        return this
    }

    body(body: any = {}){
        this.options.body = body
        return this
    }

    async send(){
        return got<any>(this.options)
        // Using Assertable Response
        //return new AssertableResponse(await got(this.options))
    }

    async sendAssertable(){
        return new AssertableResponse(await got<any>(this.options))
    }


}