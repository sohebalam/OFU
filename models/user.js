import mongoose from 'mongoose'
import crypto from 'crypto'
import userSignupValidator from '../validators/auth.valid.js'


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

userSchema.virtual('password')
.set(function(password){
    // temp var _password
    this._password = password
    this.salt = this.makeSalt()
    this.hash_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
})

userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hash_password
    },

    encryptPassword: function(password) {
        if(!password) return ''
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
        } catch (err) {
            return ''
        }
    },
    makeSalt: function(){
        return Math.round(new Date().valueOf() * Math.random()) + ''
    }
}


const User = mongoose.model('User', userSchema)
export default User

