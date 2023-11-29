import UnAuthenticatedError from "../errors/unauthenticated.js"
import { isTokenValid } from "../utils/jwt.js"
import UnAuthourizedError from '../errors/unauthorized.js'


const authenticatedUser = (req,res, next) => {
    const token = req.signedCookies.token

    if(!token){
        throw new UnAuthenticatedError('User not authorized')
    }

    try {
        const {userId, name, role} = isTokenValid(token)

        req.user = {userId, name, role}

        next()
    } catch (error) {
        throw new UnAuthenticatedError('User not authorized')
    }
}

const authorizePermissions = (...role) => {
    return ((req,res,next) => {
        if(!req.user.role.includes(role) ){
            throw new UnAuthourizedError('UnAuthorized to access this route')
        }

        next()
    })
}


export { 
    authenticatedUser,
    authorizePermissions
}