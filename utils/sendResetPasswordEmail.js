import sendEmail from "./sendEmail.js"

const sendResetPasswordEmail = async ({email, origin,token,name}) => {


    const resetPasswordUrl = `${origin}/user/forgot-password?token=${token}&email=${email}`



    return sendEmail({
        to : email,
        subject : 'Reset Password Link',
        html : `<p>Please use this link to access password reset link <a href = "${resetPasswordUrl}">Reset Password Link</a></p>`,
        text : `Hello ${name}`

    })

}

export default sendResetPasswordEmail