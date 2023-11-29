import CustomApi from "./custom-api.js";
import { StatusCodes } from 'http-status-codes'


class BadRequestError extends CustomApi{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

export default BadRequestError