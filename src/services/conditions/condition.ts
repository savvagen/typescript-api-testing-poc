import {Response} from "got";

export interface Condition {
    test(resp: Response): void
    testNot(resp: Response): void
}