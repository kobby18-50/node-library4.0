import { StatusCodes } from "http-status-codes";

const notFoundMiddleWare = (req,res) => res.status(StatusCodes.NOT_FOUND).json({msg : 'Route not found'})


export default notFoundMiddleWare