import {Response} from "got";
// import { strict as assert } from "assert";
// import * as jp from "jsonpath"
// import {JSONPath} from 'jsonpath-plus';
import {Condition} from "./conditions/condition";

export class AssertableResponse<T> {

    private readonly _resp: Response<T>

    constructor(resp: Response<T>) {
        this._resp = resp
    }

    public statusCode = () => this._resp.statusCode
    public body = (): T => this._resp.body
    public headers = () => this._resp.headers

    assert(condition: Condition){
        condition.test(this._resp)
        return this
    }

    logResponse() {
        console.log("Status: " + this._resp.statusCode + " " + this._resp.statusMessage)
        console.log("Body: \n" + JSON.stringify(this._resp.body, null, 4))
        return this
    }
}



/*

interface Condition {
    test(resp: Response<any>): void
}



export class Conditions {

    static statusCode(statusCode: number): Condition {
        return new StatusCodeCondition(statusCode)
    }

    static jsonPath(jsonPath: string, value: any): Condition {
        return new JsonPathCondition(jsonPath, value)
    }

}



export class StatusCodeCondition implements Condition {
    statusCode: number

    constructor(statusCode: number) {
        this.statusCode = statusCode
    }

    // statusCode(statusCode: number): Condition {
    //     assert(this._resp.statusCode == statusCode, `expected status code ${statusCode}, but found ${this._resp.statusCode}`)
    // }

    test(resp: Response<any>): void {
        assert(resp.statusCode == this.statusCode, `expected status code ${this.statusCode}, but found ${resp.statusCode}`)
    }

}

export class JsonPathCondition implements Condition {
    jsonPath: string
    value: any

    constructor(jsonPath: string, value: any) {
        this.jsonPath = jsonPath
        this.value = value
    }

    test(resp: Response<any>): void {
        let result: any = JSONPath({path: this.jsonPath, json: resp.body})[0] //jp.query(resp.body, this.jsonPath)[0]
        assert(JSON.stringify(result) == JSON.stringify(this.value), `Failed jsonPath ${this.jsonPath} check.\nActual: ${JSON.stringify(result)}\nExpected: ${JSON.stringify(this.value)}`)
    }

}

*/
