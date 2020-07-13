import { v4 } from "uuid";

export class IdGenerator {
    public generate() : string {
        const id = v4()
        return id
    }
}