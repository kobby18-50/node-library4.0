import sendEmail from "./sendEmail.js"


const sendVerifiedEmail = async ({name, email, verificationToken, origin}) => {

const verifiedEmailUrl = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`


const message = `<p>Please confirm email by clicking on this link : <a href="${verifiedEmailUrl}">Click here</a></p>`



    return sendEmail({to : email, subject : 'Verify Email', html : message, text : `Hello ${name}` })



}


export default sendVerifiedEmail