import { StatusCodes } from 'http-status-codes'
import BadRequestError from '../errors/bad-request.js'
import NotFoundError from '../errors/not-found.js'
import Book from '../models/Book.js'

const getAllBooks = async (req,res) => {
    const books = await Book.find({}).sort('-updatedAt')
    res.status(StatusCodes.OK).json({books, count : books.length})
}

const getBook = async (req,res) => {
    const { id : bookId} = req.params
    const book = await Book.findOne({_id : bookId})

    if(!book){
        throw new NotFoundError('Book not found')
    }

    res.status(StatusCodes.OK).json({book})
}

const getAllMyBooks = async (req,res) => {
    const books = await Book.find({createdBy : req.user.userId}).sort('-updatedAt')

    res.status(StatusCodes.OK).json({books, count : books.length})
}

const createBook = async (req,res) => {
    const {title, description} = req.body
    const {name, userId} = req.user

    if (!title || !description){
        throw new BadRequestError('Some values were not provided')
    }

    const bookAlreadyExits = await Book.findOne({title})

    if(bookAlreadyExits){
        throw new BadRequestError('Book has already been created')
    }

    req.body.author = name
    req.body.createdBy = userId

    
    const book = await Book.create(req.body)

    res.status(StatusCodes.CREATED).json({book})
}

const updateBook = async (req,res) => {
    const { id : bookId} = req.params

    const book = await Book.findOneAndUpdate({_id : bookId, createdBy : req.user.userId}, req.body, {runValidators : true, new : true})

    if(!book){
        throw new BadRequestError('No book found')
    }

    res.status(StatusCodes.ACCEPTED).json({book})
}

const deleteBook = async (req,res) => {
    const { id : bookId} = req.params
    const book = await Book.findOneAndDelete({_id : bookId})

    if(!book){
        throw new BadRequestError('No book found')
    }
    res.status(StatusCodes.OK).json({msg : 'Book deleted'})
}

export { 
    getAllBooks, getAllMyBooks, getBook, createBook, updateBook, deleteBook
}