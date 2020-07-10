import { BaseError } from "./BaseErrors/BaseErrors";

export class GenericError extends BaseError {

    constructor(message:string) {

        super(message, 400)
    }
}