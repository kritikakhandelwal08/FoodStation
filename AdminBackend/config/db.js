import mongoose from "mongoose";

const url = 'YOUR MONGODB URL'
export const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('Database is connected');
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};


//Kritika@123 
