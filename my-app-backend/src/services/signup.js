import User from '../models/user.js'
import bcrypt from 'bcrypt'
import generateToken from '../utils/jwtUtils.js';

async function createUser(userData) {
    const { name, email, password, dateBirth, gender, marketingMessages, shareData } = userData;
    const hashedPassword = await bcrypt.hash(password, 10)
    const createdUser = new User({
        name: name,
        email: email, 
        password: hashedPassword ,
        birthDate: dateBirth,
        gender: gender,
        marketingMessages: marketingMessages,
        shareData: shareData,
        role: "customer"
    });
    const savedUser = await createdUser.save();
    const token = generateToken(savedUser);
    return { savedUser, token };
}

export default createUser;