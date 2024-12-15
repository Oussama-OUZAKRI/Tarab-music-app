import authService from '../services/login.js';

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const { existingUser, token } = await authService(email, password);
        res.json({ user: existingUser, token: token });
    }  catch(error) {
        res.status(401).json({ message: 'Invalid credentials '})
    }
}

export default login;