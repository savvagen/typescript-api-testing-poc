import {Response} from "got";
import {strict as assert} from "assert";
import {JSONPath} from "jsonpath-plus";
import {Condition} from "./condition";


export class StatusCodeCondition implements Condition {
    statusCode: number

    constructor(statusCode: number) {
        this.statusCode = statusCode
    }

    test(resp: Response<any>): void {
        assert(resp.statusCode == this.statusCode, `expected status code ${this.statusCode}, but found ${resp.statusCode}`)
    }

}