import {Options, RequestError, Response} from "got";
import { allure } from "allure-mocha/runtime";
import {ContentType, Status, StepInterface} from "allure-js-commons";

const delim = '--------------------------------'

function requestAttachment(options: Options) {
    allure.logStep(`Request ${options.method} ${options.url}`, Status.PASSED)
    allure.attachment("request", `${options.method} ${options.url}\n${delim}\n
    HEADERS:\n${JSON.stringify(options.headers, null, 4)}\n${delim}\n
    BODY:\n${options.body}\n${delim}\n
    `, ContentType.TEXT)
}

function responseAttachment(response: Response) {
    if (response.statusCode >= 400) allure.logStep(`Response: ${response.statusCode} ${response.statusMessage}`, Status.BROKEN)
    else allure.logStep(`Response: ${response.statusCode} ${response.statusMessage}`, Status.PASSED)
    allure.attachment(`response`, `${response.statusCode} ${response.statusMessage}: ${response.url} \n${delim}\n
    HEADERS:\n${JSON.stringify(response.headers, null, 4)}\n${delim}\n
    TIMINGS:\n${JSON.stringify(response.timings, null, 4)}\n${delim}\n
    BODY:\n${JSON.stringify(response.body, null, 4)}\n${delim}\n
    `, ContentType.TEXT)
    return response
}

function errorAttachment(error: RequestError) {
    allure.attachment("error", `Name: ${error.name}\nMessage: ${error.message}`, ContentType.TEXT)
    return error
}

export let allureRequestHook = (options: Options): void => {
    if (allure != undefined) requestAttachment(options)
    else return
}

export let allureResponseHook = (response: Response): Response => {
    if (allure != undefined) return responseAttachment(response)
    else return response
}

export let allureErrorHook = (error: RequestError): RequestError => {
    if (allure != undefined) return errorAttachment(error)
    else return error
}
