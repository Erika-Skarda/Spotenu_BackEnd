import { BaseError } from "./BaseErrors/BaseErrors";

export class NotFoundError extends BaseError {

    constructor(message: string) {

        super(message, 404)
    }
}