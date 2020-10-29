import express from 'express'
const router = express.Router()
import time from '../controllers/blogCont.js'

router.get('/', time)


export default router