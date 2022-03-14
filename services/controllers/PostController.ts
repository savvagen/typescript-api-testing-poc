import got, {Response} from "got";
import {JsonRequest} from "../request";

export class PostController {

    private readonly baseUrl: string | undefined
    private readonly defaultHeaders = {
        'Accept': "application/json",
        'Content-Type': 'application/json'
    }

    constructor(baseUrl: string | undefined) {
        this.baseUrl = baseUrl
    }

    async getPosts() {
        return new JsonRequest()
            .baseUrl(this.baseUrl).path('/posts')
            .headers(this.defaultHeaders)
            .send()
    }

    async getPostsAssertable() {
        return new JsonRequest()
            .baseUrl(this.baseUrl).path('/posts')
            .headers(this.defaultHeaders)
            .sendAssertable()
    }

    async getPostById(id: number | string){
        // const resp = await got.get(`${this.baseUrl}/posts/${id}`, { headers: this.defaultHeaders});
        // const body = JSON.parse(resp.body)
        // return { body: body, opts: resp}
        // --------------------------------------
        return new JsonRequest()
            .baseUrl(this.baseUrl).path(`/posts/${id}`)
            .headers(this.defaultHeaders)
            .send()
    }

    async getPostByIdAssertable(id: number | string){
        return new JsonRequest()
            .baseUrl(this.baseUrl).path(`/posts/${id}`)
            .headers(this.defaultHeaders)
            .sendAssertable()
    }

    async getPostByCategory(category: string){
        // const resp = await got.get(`${this.baseUrl}/posts`, {
        //     searchParams: new URLSearchParams({ category: category}),
        //     headers: this.defaultHeaders
        // });
        // const body = JSON.parse(resp.body)
        // return { body: body, opts: resp}
        // --------------------------------------
        return  new JsonRequest()
            .baseUrl(this.baseUrl).path("/posts")
            .query({category: category})
            .headers(this.defaultHeaders)
            .send()
    }

    async createPost(json: object){
        // const resp = await got.post(`${this.baseUrl}/posts`, {
        //     json: post,
        //     headers: this.defaultHeaders
        // });
        // const body = JSON.parse(resp.body)
        // return { body: body, opts: resp}
        // --------------------------------------
        return new JsonRequest()
            .baseUrl(this.baseUrl).path("/posts")
            .method("POST")
            .body(JSON.stringify(json))
            .headers(this.defaultHeaders)
            .send()
    }

}