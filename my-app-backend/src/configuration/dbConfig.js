import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/jwt_db");

mongoose.connection.on("connected", () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on("error", (err) => {
    console.log(`MongoDB connection error: ${err}`);
});

export default mongoose;