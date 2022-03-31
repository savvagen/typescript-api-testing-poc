import {JsonRequest} from "../request";
import {Post} from "../../models/Post"
import {BaseController, RequestParams} from "./BaseController";
import {Step} from "../../decorators/allure";

export class PostController extends BaseController {


    constructor(params: RequestParams) {
        super(params);
    }

    @Step()
    public async getPosts() {
        return new JsonRequest()
            .baseUrl(this.baseUrl).path('posts')
            .headers(this.defaultHeaders)
            .sendAssertable<Post[]>()
    }

    @Step()
    async getPostById(id: number | string){
        // const resp = await got.get(`${this.baseUrl}/posts/${id}`, { headers: this.defaultHeaders});
        // const body = JSON.parse(resp.body)
        // return { body: body, opts: resp}
        // --------------------------------------
        return new JsonRequest()
            .baseUrl(this.baseUrl).path(`posts/${id}`)
            .headers(this.defaultHeaders)
            .sendAssertable<Post>()
    }

    @Step()
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

    @Step()
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
            .sendAssertable<any>()
    }

}