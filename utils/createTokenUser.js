
const createTokenUser = (user) => {
    return {
        userId : user._id,
        name : user.name,
    }
}

export default createTokenUser