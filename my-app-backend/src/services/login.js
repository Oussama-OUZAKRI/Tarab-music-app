import User from '../models/user.js'
import bcrypt from 'bcrypt'
import generateToken from '../utils/jwtUtils.js';

async function login(email, password) {
    try {
        const existingUser = await User.findOne({ email });
        if(!existingUser) {
            throw new Error("User Not Found");
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordValid) {
            throw new Error("Incorrect password");
        }
        const token = generateToken(existingUser);
        return { existingUser, token };
    } catch(err) {
        console.log("Login error: ", err.message);
        throw new Error("Invalid Credentials");
    }
}

export default login;