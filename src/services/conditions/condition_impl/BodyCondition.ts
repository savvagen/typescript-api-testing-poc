import {Condition} from "../condition";
import {Response} from "got";
import {assert} from "chai";

export class BodyCondition implements Condition{

    constructor(private body: any) {}

    test(resp: Response<any>): void {
        assert.deepEqual(resp.body, this.body, `Json body do not matches expected.\nActual:\n${JSON.stringify(resp.body, null, 2)}\nExpected:\n${JSON.stringify(this.body, null, 2)}`)
    }

    testNot(resp: Response<any>): void {
        assert.notDeepEqual(resp.body, this.body, `Json body SHOULD NOT match expected.\nActual:\n${JSON.stringify(resp.body, null, 2)}\nExpected:\n${JSON.stringify(this.body, null, 2)}`)
    }

}