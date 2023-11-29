
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
        minlength : 5
    },

    email : {
        type : String,
        required : true,
        unique : true,
        validate : {
            validator : validator.isEmail,
            message : 'Please provide a valid email'
        }
    },

    password : {
        type : String,
        required : true
    },

    passwordToken : {
        type : String
    },

    passwordTokenExpirationDate : {
        type : Date
    },

    verified : {
        type : Date
    },

    isVerified : {
        type : Boolean,
        default : false
    },

    verificationToken : {
        type : String,
    }
}, {timestamps : true})


UserSchema.pre('save', async function(){

    console.log(this.modifiedPaths())

    if(!this.isModified('password')) return 
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePasswords = async function(candidatePassword){
    const isMatch = bcrypt.compare(candidatePassword, this.password)
    return isMatch
}


export default mongoose.model('User', UserSchema)