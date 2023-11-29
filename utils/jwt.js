import jwt from 'jsonwebtoken'

const createToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : process.env.JWT_LIFETIME})

    return token
}



const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET)



const attachCookieToResponse = ({res, user}) => {
    const token = createToken(user)

    const oneDay = 1000 * 60 * 24

    // attach cookie
    res.cookie('token', token, {
        httpOnly:true,
        expiresIn : new Date(Date.now() + oneDay),

        secure : process.env.NODE_ENV === 'production',
        signed : true
    })
}





export {
    createToken,
    isTokenValid,
    attachCookieToResponse
}