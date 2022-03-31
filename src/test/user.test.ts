import {UserController} from "../services/controllers/UserController";
import {expect} from "chai";
import {User} from "../models/User";
import {Response} from "got";
import faker from "@faker-js/faker"
import {ApiClient} from "../services/client";
import {AssertableResponse} from "../services/response";
import {body, jsonPath, statusCode} from "../services/conditions/conditions";
import {generateUser} from "../data/data.generator";

const BASE_URL = process.env.BASE_URL != undefined ? process.env.BASE_UR : "http://localhost:3001/api"
const CREDENTIALS = {username: "test", password: "test"}


describe('Users Test Suite', async function() {


    //let userController: UserController = new UserController({ baseUrl: BASE_URL, token: undefined})

    // before(async ()=>{
    //     const token = await userController.getToken(CREDENTIALS)
    //     userController.refreshToken(token)
    // })

    const apiClient = new ApiClient({ baseUrl: BASE_URL})


    it('should get token', async () => {
        let token =  await apiClient.users.getToken(CREDENTIALS)
        expect(token).not.to.eq(undefined)
        expect(token.length).to.be.greaterThanOrEqual(40)
    });

    it('should get users', async function() {
        let resp: AssertableResponse<User[]> = await apiClient.users.getUsers()
        resp.assert(statusCode(200))
            .assert(jsonPath("$[0].id", 1))
        expect(resp.statusCode()).to.eq(200)
        expect(resp.body()[0].id).not.to.eq(undefined)
        expect(resp.body().length).to.be.greaterThanOrEqual(100)
    });

    it('should not get user with invalid id', async function() {
        await (await apiClient.users.getUser("null"))
            .logResponse()
            .shouldHave(statusCode(404))
            .shouldHave(body({}))
    });


    it('should create user', async function() {
        let adminClient = await ApiClient.loginAs(CREDENTIALS)
        const user = generateUser()
        const resp: AssertableResponse<User> = await adminClient.users.createUser(user)
        resp.shouldHave(statusCode(201))
            .shouldHave(body({ ...user, ...{ id: resp.body().id } }))
        // expect(resp.statusCode()).to.eq(201)
        // expect({ ...user, ...{ id: resp.body().id } }).to.deep.equal(resp.body())
        // assert.deepEqual({ ...user, ...{id: resp.body.id} }, resp.body)
    });

});