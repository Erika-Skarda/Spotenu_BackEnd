import { BaseError } from "./BaseErrors/BaseErrors";

export class Unauthorized extends BaseError {

    constructor(message:string) {
        super(message, 401)
    }
}