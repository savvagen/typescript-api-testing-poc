import {BaseController} from "./BaseController";
import {User} from "../../models/User";
import {JsonRequest} from "../request";
import {definitions} from '../../out/models'
import {CookieJar} from "tough-cookie";

type petStatus = "pending" | "available"


export class PetController extends BaseController {

    constructor(params: { baseUrl: string | undefined; token?: string | undefined; cookies?: CookieJar }) {
        super(params);
    }

    async getPetByStatus(status: petStatus){
        return new JsonRequest()
            .baseUrl(this.baseUrl).path("v2/pet/findByStatus")
            .headers(this.defaultHeaders)
            .query({status: status})
            .send<definitions['Pet']>()
    }


}