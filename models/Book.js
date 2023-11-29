import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Book title is required'],
        minlength : 5,
        unique : true,
        trim : true
    },

    author : {
        type : String,
        required : [true, 'Book author is required'],
        minlength : 5
    },

    description : {
        type : String,
        required : [true, 'Book author is required'],
        minlength : 5
    },

    file : {
        type : String,
    },

    image : {
        type : String,
    },

    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    }
}, {timestamps : true})

export default mongoose.model('Book', BookSchema)