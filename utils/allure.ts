import {Options, RequestError, Response} from "got";
import { allure } from "allure-mocha/runtime";
import {ContentType, Status} from "allure-js-commons";

const delim = '--------------------------------'

export function requestAttachment(options: Options) {
    allure.logStep(`Request ${options.method} ${options.url}`, Status.PASSED)
    allure.attachment("request", `${options.method} ${options.url}\n${delim}\n
    HEADERS:\n${JSON.stringify(options.headers, null, 4)}\n${delim}\n
    BODY:\n${JSON.stringify(options.body, null, 4)}\n${delim}\n
    `, ContentType.TEXT)
}

export function responseAttachment(response: Response) {
    allure.logStep(`Response: ${response.statusCode} ${response.statusMessage}`, Status.PASSED)
    allure.attachment(`response`, `${response.statusCode} ${response.statusMessage}: ${response.url} \n${delim}\n
    HEADERS:\n${JSON.stringify(response.headers, null, 4)}\n${delim}\n
    TIMINGS:\n${JSON.stringify(response.timings, null, 4)}\n${delim}\n
    BODY:\n${JSON.stringify(response.body, null, 4)}\n${delim}\n
    `, ContentType.TEXT)
}

export function errorAttachment(error: RequestError) {
    allure.attachment("error", `Name: ${error.name}\nMessage: ${error.message}`, ContentType.TEXT)
}

export let allureRequestHook = (options: Options): void => {
    requestAttachment(options)
}

export let allureResponseHook = (response: Response): Response => {
    responseAttachment(response)
    return response
}

export let allureErrorHook = (error: RequestError): RequestError => {
    errorAttachment(error)
    return error
}