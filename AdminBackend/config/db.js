import mongoose from "mongoose";

const url = 'mongodb+srv://vanshita222003:Klawclaw_22@mitrc.onxuacg.mongodb.net/bloging'
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