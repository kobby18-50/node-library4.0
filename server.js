import express from 'express'
import dotenv from 'dotenv'

// other packages
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import {v2 as cloudinary } from 'cloudinary'
import cors from 'cors'

// security imports
import helmet from 'helmet'
import xss from 'xss-clean'
import rateLimit from 'express-rate-limit'

import 'express-async-errors'
import connectDB from './db/connect.js'
dotenv.config()



const app = express()

// middleware imports
import notFoundMiddleWare from './middleware/not-found.js'
import errorHandlerMiddleWare from './middleware/error-handler.js'

// routes imports
import authRouter from './routes/authRoutes.js'
import bookRouter from './routes/bookRoutes.js'

// cloudinary config
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
})

app.use(morgan('tiny'))

// security
app.set('trust proxy', 1)
app.use(rateLimit({
    windowMs : 15 * 60 * 1000,
    max : 100
}))

// express.json
app.use(express.json())

// security
app.use(helmet())
app.use(xss())
app.use(cors())

// cookie parser
app.use(cookieParser(process.env.JWT_SECRET))

// file upload
app.use(fileUpload({ useTempFiles : true }))

// routes
app.get('/', (req,res) => {
    console.log(req.signedCookies)
    res.send('welcome')
})

// auth route
app.use('/api/v1/auth', authRouter)

// book route
app.use('/api/v1/book', bookRouter)




// middleware
app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleWare)

const port = process.env.PORT || 5000


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
