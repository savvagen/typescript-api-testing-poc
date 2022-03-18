import {JsonRequest} from "../request";
import {Post} from "../../models/Post"
import {BaseController} from "./BaseController";
import {CookieJar} from "tough-cookie";

export class PostController extends BaseController {


    constructor(params: { baseUrl: string | undefined; token?: string | undefined; cookies?: CookieJar }) {
        super(params);
    }

    public async getPosts() {
        return new JsonRequest()
            .baseUrl(this.baseUrl).path('posts')
            .headers(this.defaultHeaders)
            .send<Post[]>()
    }

    public async getPostsAssertable() {
        return new JsonRequest()
            .baseUrl(this.baseUrl).path('posts')
            .headers(this.defaultHeaders)
            .sendAssertable()
    }

    async getPostById(id: number | string){
        // const resp = await got.get(`${this.baseUrl}/posts/${id}`, { headers: this.defaultHeaders});
        // const body = JSON.parse(resp.body)
        // return { body: body, opts: resp}
        // --------------------------------------
        return new JsonRequest()
            .baseUrl(this.baseUrl).path(`posts/${id}`)
            .headers(this.defaultHeaders)
            .send<any>()
    }

    async getPostByIdAssertable(id: number | string){
        return new JsonRequest()
            .baseUrl(this.baseUrl).path(`posts/${id}`)
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
            .baseUrl(this.baseUrl).path("posts")
            .query({category: category})
            .headers(this.defaultHeaders)
            .send<any>()
    }

    async createPost(post: object){
        // const resp = await got.post(`${this.baseUrl}/posts`, {
        //     json: post,
        //     headers: this.defaultHeaders
        // });
        // const body = JSON.parse(resp.body)
        // return { body: body, opts: resp}
        // --------------------------------------
        return new JsonRequest()
            .baseUrl(this.baseUrl).path("posts")
            .method("POST")
            .body(JSON.stringify(post))
            .headers(this.defaultHeaders)
            .send<any>()
    }

}