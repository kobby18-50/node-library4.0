import express from 'express'
import { getAllBooks, getAllMyBooks, getBook, updateBook, createBook, deleteBook} from '../controllers/bookController.js'
import { uploadFile, uploadImage} from '../controllers/uploadsController.js'
import { authenticatedUser } from '../middleware/authentication.js'


const router = express.Router()

router.route('/').get(getAllBooks).post(authenticatedUser,createBook)

router.get('/my-books', authenticatedUser, getAllMyBooks)

router.patch('/uploadFile/:id', authenticatedUser, uploadFile)
router.patch('/uploadImg/:id', authenticatedUser, uploadImage)

router.route('/:id').get(getBook).patch(authenticatedUser, updateBook).delete(authenticatedUser, deleteBook)


export default router