import {Response} from "got";
import { strict as assert } from "assert";
import { expect } from 'chai'
import { PostController } from "../services/controllers/PostController"
import {AssertableResponse} from "../services/response";
import {statusCode, jsonPath } from "../services/conditions/conditions"
import {Post} from "../models/Post"
import {generatePost} from "../data/data.generator";
import faker from "@faker-js/faker/locale/en_US";


const BASE_URL = process.env.BASE_URL != undefined ? process.env.BASE_URL : "http://localhost:3001/api"


describe('Posts Test Suite', function () {

    let postController = new PostController({baseUrl: BASE_URL})

    before(()=>{ console.log("Starting Posts Test Suite") })
    beforeEach(()=>{})
    after(()=>{})

    it('should get posts', async function () {
        const resp = await postController.getPosts()
        assert(resp.statusCode() === 200, `status code should be 200, but found ${resp.statusCode()}`)
        assert(typeof resp.body() == "object")
        expect(resp.body().filter((post: Post) => post.id === 1)[0].id).to.be.equal(1)
        expect(resp.body()[0].id).not.to.eq(undefined)
        expect(resp.body().length).to.be.greaterThanOrEqual(100)
    });

    it('should get posts with fluent assertions', async function () {
        let resp: AssertableResponse<Post[]> = await postController.getPosts()
        resp.shouldHave(statusCode(200))
            .shouldNotHave(statusCode(400))
            .shouldNotHave(statusCode(500))
            .assert(jsonPath("$[0].id", 1))
            .assert(jsonPath("$[0].comments[0]", 1))
            //.logResponse()
    });

    it('should get post by id', async function () {
        let resp: AssertableResponse<Post> = await postController.getPostById(1)
        assert(resp.statusCode() === 200, `status code should be 200, but found ${resp.statusCode()}`)
        expect(resp.body().id).not.to.eq(undefined)
        expect(resp.body().id).to.eq(1)
        expect(resp.body().title).to.be.equal("Post 1")
    });

    it('should get post by id with fluent assertions', async function () {
        await (await postController.getPostById(1))
            .shouldHave(statusCode(200))
            .assert(jsonPath("$.id", 1))
            .assert(jsonPath("$.title", "Post 1"))
            .logResponse()
    });

    it('should get posts by category', async function () {
        let resp: Response<Post[]> = await postController.getPostByCategory("cats")
        assert(resp.statusCode === 200, 'status code should be 200')
        expect(resp.body[0].id).not.to.eq(undefined)
        expect(resp.body.length).to.be.greaterThanOrEqual(10)
    });


    it('should create post', async ()=> {
        const post: Post = generatePost(faker.datatype.number({min: 1, max: 100}))
        const resp = await postController.createPost(post)
        resp.shouldHave(statusCode(201))
            .shouldNotHave(jsonPath("$.id", null))
            .assert(jsonPath("$.category", post.category))
            .assert(jsonPath("$.user", post.user))
        // expect(resp.statusCode).to.be.eq(201)
        // expect(resp.body.id).not.to.be.null
        // expect(resp.body.category).to.be.equal("test")
        // expect(resp.body.user).to.be.equal(5)
    });


})