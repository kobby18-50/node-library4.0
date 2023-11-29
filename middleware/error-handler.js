import {StatusCodes} from 'http-status-codes'

const errorHandlerMiddleWare = (err,req,res,next) => {
    let customError = {
        message : err.message || 'Something went wrong try again later',
        statusCode : err.statusCode ||  StatusCodes.INTERNAL_SERVER_ERROR
    }

    if(err.name === "ValidationError"){
        customError.message = Object.values(err.errors).map(item => item.message).join(', ')
        customError.statusCode = 400
    }

    // duplicate email
    if(err.code === 11000){
        customError.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose a different one`
        customError.statusCode = StatusCodes.BAD_REQUEST
    }

    // cast error
    if(err.name === 'CastError'){
        customError.msg = `No item with id : ${err.value}`
        customError.statusCode = 404
     }

    return res.status(customError.statusCode).json({msg : customError.message})
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg : err})
}

export default errorHandlerMiddleWare