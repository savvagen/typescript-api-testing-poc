import {Response} from "got";
import {AssertionError, strict as assert} from "assert";
import {Condition} from "../condition";
import {allure} from "allure-mocha/runtime";
import {Status} from "allure-js-commons";

export class StatusCodeCondition implements Condition {
    statusCode: number

    constructor(statusCode: number) {
        this.statusCode = statusCode
    }


    test(resp: Response<any>): void {
        assert(resp.statusCode == this.statusCode, `expected status code ${this.statusCode}, but found ${resp.statusCode}`)
        // if (allure != undefined) allure.logStep("Status Code should be " + this.statusCode, Status.PASSED)
    }

    testNot(resp: Response): void {
        assert(resp.statusCode !== this.statusCode, `expected status code not to be: ${this.statusCode}, but found ${resp.statusCode}`)
        // if (allure != undefined) allure.logStep("Status Code should not be " + this.statusCode, Status.PASSED)
    }

}