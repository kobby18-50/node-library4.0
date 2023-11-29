import { v2 as cloudinary } from 'cloudinary'
import Book from '../models/Book.js'
import NotFoundError from '../errors/not-found.js'
import { StatusCodes } from 'http-status-codes'
import BadRequestError from '../errors/bad-request.js'
import {  unlinkSync } from 'node:fs'

const uploadFile = async (req,res) => {
    const { id : bookId} = req.params

    const book = await Book.findOne({_id : bookId, createdBy : req.user.userId})

    console.log(req.files.file.mimetype)

     // empty file
     if(!req.files){
        throw new BadRequestError('No file selected')
    }

     // check format
     if(req.files.file.mimetype !== 'application/pdf'){
        throw new BadRequestError('Upload a pdf file')
    }

    if(!book){
        throw new NotFoundError('No book found')
    }

    const result = await cloudinary.uploader.upload(
        req.files.file.tempFilePath , { use_filename : true, folder : 'library4.0/pdfs'}, 
    )

    book.file = result.secure_url

    await book.save()

    res.status(StatusCodes.ACCEPTED).json({book})
}

const uploadImage = async (req,res) => {

    const { id : bookId} = req.params

    const book = await Book.findOne({_id : bookId, createdBy : req.user.userId})

    // empty file
    if(!req.files){
        throw new BadRequestError('No image selected')
    }


    // check format
    if(!req.files.image.mimetype.startsWith('image')){
        throw new BadRequestError('Upload an image')
    }

    const maxSize = 1024 * 1024

    if(req.files.image.size > maxSize){
        throw new BadRequestError('File is greater than required size')
    }


    if(!book){
        throw new NotFoundError('No book found')
    }

    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath, { use_filename : true, folder : 'library4.0/images'}
    )

    book.image = result.secure_url

    await book.save()

    unlinkSync(req.files.image.tempFilePath)

    res.status(StatusCodes.ACCEPTED).json({book})

}

export {
    uploadFile, uploadImage
}