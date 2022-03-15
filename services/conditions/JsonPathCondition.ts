import {Response} from "got";
import {strict as assert} from "assert";
import {JSONPath} from "jsonpath-plus";
import {Condition} from "./condition";


export class JsonPathCondition implements Condition {
    jsonPath: string
    value: any

    constructor(jsonPath: string, value: any) {
        this.jsonPath = jsonPath
        this.value = value
    }

    test(resp: Response<any>): void {
        let result: any = JSONPath({path: this.jsonPath, json: resp.body})[0]
        assert(JSON.stringify(result) == JSON.stringify(this.value), `Failed jsonPath ${this.jsonPath} check.\nActual: ${JSON.stringify(result)}\nExpected: ${JSON.stringify(this.value)}`)
    }

}