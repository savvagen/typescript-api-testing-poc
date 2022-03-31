import {BaseController, RequestParams} from "./BaseController";
import {JsonRequest} from "../request";
import {definitions} from '../../../out/models'
import {Step} from "../../decorators/allure";

type petStatus = "pending" | "available"


export class PetController extends BaseController {

    constructor(params: RequestParams) {
        super(params);
    }

    @Step()
    async getPetByStatus(status: petStatus){
        return new JsonRequest()
            .baseUrl(this.baseUrl).path("v2/pet/findByStatus")
            .headers(this.defaultHeaders)
            .query({status: status})
            .send<definitions['Pet']>()
    }


}