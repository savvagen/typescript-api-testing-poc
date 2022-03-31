import {Condition} from "./condition";
import {StatusCodeCondition} from "./condition_impl/StatusCodeCondition";
import {JsonPathCondition} from "./condition_impl/JsonPathCondition";
import {ContentTypeCondition} from "./condition_impl/ContentTypeCondition";
import {BodyCondition} from "./condition_impl/BodyCondition";


export function statusCode(statusCode: number): Condition {
    return new StatusCodeCondition(statusCode)
}

export function jsonPath(jsonPath: string, value: any): Condition {
    return new JsonPathCondition(jsonPath, value)
}

export function contentType(contentType: string): Condition {
    return new ContentTypeCondition(contentType)
}

export function body(body: any): Condition {
    return new BodyCondition(body)

}