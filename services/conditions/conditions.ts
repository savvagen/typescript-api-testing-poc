import {Condition} from "./condition";
import {StatusCodeCondition} from "./StatusCodeCondition";
import {JsonPathCondition} from "./JsonPathCondition";


export function statusCode(statusCode: number): Condition {
    return new StatusCodeCondition(statusCode)
}
export function jsonPath(jsonPath: string, value: any): Condition {
    return new JsonPathCondition(jsonPath, value)
}
