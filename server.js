import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './routes/blog.js'
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()

mongoose.connect(process.env.DB_LOCAL, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(() => console.log('DB connected'))

app.use(morgan('dev')) 
app.use(bodyParser.json()) 
app.use(cookieParser()) 

if(process.env.NODE_ENV === 'development'){
app.use(cors({origin: `${process.env.CLIENT_URL}`})) 
}

// middleware
app.use('/api',router)
app.use('/api', authRoutes)




const port = process.env.PORT || 8000
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})