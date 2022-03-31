import {Condition} from "../condition";
import {Response} from "got";
import {strict as assert} from "assert";
import {allure} from "allure-mocha/runtime";
import {Status} from "allure-js-commons";

export class ContentTypeCondition implements Condition {

    contentType: string

    constructor(contentType: string) {
        this.contentType = contentType
    }

    test(resp: Response): void {
        assert(resp.headers["content-type"] === this.contentType, `Content Type does not match expected.\nActual ${resp.headers["content-type"]}\nExpected: ${this.contentType}`)
    }

    testNot(resp: Response): void {
        assert(resp.headers["content-type"] !== this.contentType, `Content Type should not match expected: ${this.contentType}. But found: ${resp.headers["content-type"]}`)
    }

}