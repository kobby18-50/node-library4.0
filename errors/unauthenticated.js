import { StatusCodes } from "http-status-codes";
import CustomApi from "./custom-api.js";


class UnAuthenticatedError extends CustomApi{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

export default UnAuthenticatedError