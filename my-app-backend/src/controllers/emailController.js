import User from '../models/user.js'

async function checkEmail(req, res) {
    try {
        const { email } = req.body;
        const emailExists = await User.findOne({'email': email});
        
        if (emailExists) {
            res.status(200).json({ exists: true });
        } else {
            res.status(200).json({ exists: false });
        }
    } catch(err) {
        console.log(err);
        res.status(404).json({message: err.message});
    }
} 

export default checkEmail;