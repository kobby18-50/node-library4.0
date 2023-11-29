import { StatusCodes } from "http-status-codes";
import CustomApi from "./custom-api.js";

class NotFoundError extends CustomApi{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

export default NotFoundError