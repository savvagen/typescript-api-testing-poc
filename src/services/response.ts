import {Response} from "got";
import {Condition} from "./conditions/condition";
import {IncomingHttpHeaders} from "http";


export class AssertableResponse<T> {

    private readonly _resp: Response<T>

    constructor(resp: Response<T>) {
        this._resp = resp
    }

    public response = (): Response<T> => this._resp
    public statusCode = () => this._resp.statusCode
    public body = (): T => this._resp.body
    public headers = (): IncomingHttpHeaders => this._resp.headers

    assert(condition: Condition){
        condition.test(this._resp)
        return this
    }

    shouldHave(condition: Condition){
        condition.test(this._resp)
        return this
    }

    shouldNotHave(condition: Condition){
        condition.testNot(this._resp)
        return this
    }

    logResponse() {
        console.log("Status: " + this._resp.statusCode + " " + this._resp.statusMessage)
        console.log("Headers:\n" + JSON.stringify(this._resp.headers, null, 2))
        console.log("Body: \n" + JSON.stringify(this._resp.body, null, 2))
        return this
    }
}
