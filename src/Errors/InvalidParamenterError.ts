import { BaseError } from "./BaseErrors/BaseErrors";

export class InvalidParameterError extends BaseError {

    constructor(message: string) {

        super(message, 422)
    }
}