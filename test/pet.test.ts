import { strict as assert } from "assert";
import {PetController} from "../services/controllers/PetController";
import {ResponseValidator} from "response-openapi-validator";
import {CONFIG} from "../config/npmConfig";
import {ApiClient} from "../services/client";


const BASE_URL = process.env.BASE_URL != undefined ? process.env.BASE_URL : "https://petstore.swagger.io"


describe('Pets Test Suite', function () {

    let apiClient = new ApiClient({baseUrl: BASE_URL})

    const responseValidator = new ResponseValidator({
        openApiSpecPath: CONFIG.get("swagger_url", "https://petstore.swagger.io/v2/swagger.json"),
        apiPathPrefix: "/v2",
        ajvOptions: {
            allErrors: true,
            verbose: true,
            formats: {
                int64: /^\d+$/,
                int32: /^\d+$/,
                double: /[+-]?\\d*\\.?\\d+/,
            }
        }
    })

    it('should get pets by status', async function () {
        const resp =  await apiClient.pets.getPetByStatus("available")
        assert(resp.statusCode === 200, `status code should be 200, but found ${resp.statusCode}`)
        await responseValidator.assertResponse({
            method: resp?.request?.options?.method,
            requestUrl: resp?.request?.requestUrl,
            statusCode: resp?.statusCode,
            body: resp?.body
        })
    });


})