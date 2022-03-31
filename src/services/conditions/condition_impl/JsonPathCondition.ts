import {Response} from "got";
import {strict as assert} from "assert";
import {JSONPath} from "jsonpath-plus";
import {Condition} from "../condition";


export class JsonPathCondition implements Condition {
    jsonPath: string
    value: any

    constructor(jsonPath: string, value: any) {
        this.jsonPath = jsonPath
        this.value = value
    }

    jsonPathResult(resp: Response<any>){
        return JSONPath({path: this.jsonPath, json: resp.body})[0]
    }

    test(resp: Response<any>): void {
        let result: any = this.jsonPathResult(resp)
        assert(JSON.stringify(result) === JSON.stringify(this.value), `Failed jsonPath ${this.jsonPath} check.\nActual: ${JSON.stringify(result)}\nExpected: ${JSON.stringify(this.value)}`)
    }

    testNot(resp: Response<any>): void {
        let result: any = this.jsonPathResult(resp)
        assert(JSON.stringify(result) !== JSON.stringify(this.value), `Expected jsonPath ${this.jsonPath} result not to be. ${JSON.stringify(this.value)}\n. But found: ${JSON.stringify(result)}`)
    }

}