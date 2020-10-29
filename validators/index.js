import checkAPIs from 'express-validator';


const { validationResult } = checkAPIs;


const runValidation = (req, res, next) => {
    const errors =validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({erro: errors.array()[0].msg})
    }
}

export default runValidation