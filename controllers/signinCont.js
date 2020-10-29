import User from '../models/user.js'
import shortId from 'shortid'
import jwt  from 'jsonwebtoken'
import expressJwt from 'express-jwt'

const signin = (req,res)=> {
    
    const {email, password} = req.body


    User.findOne({email}).exec((err, user) => {
        if(err || !user){
            return res.stauts.json(400).json({
                error: 'Email does not exists, please sign up'
            })  
        
        }
        if(!user.authenticate(password)) {
            return res.stauts.json(400).json({
      
                error: 'Email does not match , please sign up '
        })}
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
        res.cookie('token', token, { expiresIn: '1d' });
        const { _id, username, name, email, role } = user;
        return res.json({
            token,
            user: { _id, username, name, email, role }
        });


    })   
   
        
    
        
}

export default signin
    