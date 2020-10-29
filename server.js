import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const app = express()

mongoose.connect(process.env.DB, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(() => console.log('DB connected'))

app.use(morgan('dev')) 
app.use(bodyParser.json()) 
app.use(cookieParser()) 

if(process.env.NODE_ENV === 'development'){
app.use(cors({origin: `${process.env.CLIENT_URL}`})) 
}
app.get('/api', (req, res ) => {
    res.json({time: Date().toString()})
})

const port = process.env.PORT || 8000
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})