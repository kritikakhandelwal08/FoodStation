
import mongoose from "mongoose";

const connectDB = () => {
    // First database connection
    mongoose
        .connect("YOUR MONGODB URL")
        .then(() => {
            console.log("Successfully connected to the first database blogging");
        })
        .catch((e) => {
            console.log("Error connecting to the first database:", e);
        });

    }

export default connectDB;



