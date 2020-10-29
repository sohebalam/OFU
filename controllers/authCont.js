
import User from '../models/user.js'
import shortId from 'shortid'



const signup = (req,res)=> {
    
    User.findOne({emails: req.body.email}).exec((err, user) => {
        if(user){
            return res.stauts.json(400).json({
                error: 'Email exists, please login'
            })
        }
    })
    
    const {name, email, password} = req.body
    let username = shortId.generate()
    let profile = `${process.env.CLIENT_URL}/profile/${username}`

        let newUser = new User({name,email, password, profile, username})
        newUser.save((err,success)=> {
        if(err){
            return res.stauts(400).json({error: err})
        }
        res.json([
            {user: {name, email, password}}])
    })
 
    
    
    
}



export default signup