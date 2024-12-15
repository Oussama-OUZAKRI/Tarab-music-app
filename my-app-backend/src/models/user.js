import mongoose from '../configuration/dbConfig.js'

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    birthDate: String,
    gender: String,
    marketingMessages: Boolean,
    shareData: Boolean,
    role: {type: String, enum: ['admin', 'customer'], default: 'customer'}
});

export default mongoose.model('User', userSchema);