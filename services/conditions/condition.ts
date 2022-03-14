import {Response} from "got";

export interface Condition {
    test(resp: Response<any>): void
}
