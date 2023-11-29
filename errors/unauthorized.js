import { StatusCodes } from "http-status-codes";
import CustomApi from "./custom-api.js";

class UnAuthorizedError extends CustomApi{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.FORBIDDEN
    }
}


export default UnAuthorizedError