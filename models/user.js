import mongoose from 'mongoose'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        max: 16,
        unique: true,
        index: true,
        lowercase: true

    },
    name: {
        type: String,
        trim: true,
        required: true,
        max: 16,
     

    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true, 
    },
    profile: {
        type: String,
        trim: true,
        required: true,
 },
    hash_password: {
        type: String,
        trim: true,
        required: true,
 },
    salt: {
        type: String,
        about: {
            type: String
        },
        role: {
            type: Number,
            trim: true
        },
        photo: {
            data: Buffer,
            contentType: String,
            
        },
        resetPasswordLink: {
            data: String,
            default: ''

        },
 },
}, {timestamps: true})


const User = mongoose.model('User', userSchema)
export default User