import userService from '../services/signup.js'

async function createUser(req, res) {
    try {
        const userData = req.body;
        const user = await userService(userData);
        res.status(201).json({user: user.savedUser, token: user.token, message: 'User created successfully'});
    } catch(err) {
        console.log(err);
        res.status(404).json({message: err.message});
    }
}

export default createUser;