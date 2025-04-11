import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

console.log('Mongo URI:', process.env.MONGODB_URI);


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to MongoDB: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB error: " ,error)
        process.exit(1);
    }
}


export default connectDB;