import got, {Response} from "got"
import { strict as assert } from "assert";
import {URLSearchParams} from "url"
import {expect} from 'chai'
import {PostController} from "../services/controllers/PostController";
import {AssertableResponse} from "../services/response";
import {statusCode, jsonPath } from "../services/conditions/conditions"

const BASE_URL = process.env.BASE_URL != undefined ? process.env.BASE_UR : "http://localhost:3001/api"

describe('Pets Test Suite', function () {

    let postController = new PostController(BASE_URL)

    it('should get posts', async function () {
        const resp: Response<Array<Post>> = await postController.getPosts()
        assert(resp.statusCode === 200, `status code should be 200, but found ${resp.statusCode}`)
        console.assert(typeof resp.body == "object")
        expect(resp.body.filter((post: Post) => post.id === 1)[0]).to.be.equal(1)
        expect(resp.body[0].id).not.to.eq(undefined)
        expect(resp.body.length).to.be.greaterThanOrEqual(100)
    });

    it('should get posts with fluent assertions', async function () {
        let resp: AssertableResponse = await postController.getPostsAssertable()
        resp.assert(statusCode(200))
            //.logResponse()
            .assert(jsonPath("$[0].id", 1))
            .assert(jsonPath("$[0].comments", [1,52,17]))
    });

    it('should get post by id', async function () {
        let resp: Response<Post> = await postController.getPostById(1)
        assert(resp.statusCode === 200, `status code should be 200, but found ${resp.statusCode}`)
        expect(resp.body.id).not.to.eq(undefined)
        expect(resp.body.id).to.eq(1)
        expect(resp.body.title).to.be.equal("Post 1")
    });

    it('should get post by id with fluent assertions', async function () {
        await postController.getPostByIdAssertable(1)
            .then(resp =>{
                resp.assert(statusCode(200))
                    .logResponse()
                    .assert(jsonPath("$.id", 1))
                    .assert(jsonPath("$.title", "Post 1"))
        })
    });

    it('should get posts by category', async function () {
        let resp: Response<any> = await postController.getPostByCategory("cats")
        assert(resp.statusCode === 200, 'status code should be 200')
        expect(resp.body[0].id).not.to.eq(undefined)
        expect(resp.body.length).to.be.greaterThanOrEqual(10)
    });


    it('should create post', async ()=> {
        const post: object = {
                "title": "Post 5",
                "subject": "Test Subject 5",
                "body": "Hello This is a post 5",
                "category": "test",
                "user": 5,
                "comments": [5, 8, 76 ],
                "createdAt": `${new Date().toISOString()}`
            }
        let resp: Response<any> = await postController.createPost(post)
        console.log(resp.body)
        //console.log(resp.body)
        expect(resp.statusCode).to.be.eq(201)
        expect(resp.body.id).not.to.be.null
        expect(resp.body.category).to.be.equal("test")
        expect(resp.body.user).to.be.equal(5)

    });


})