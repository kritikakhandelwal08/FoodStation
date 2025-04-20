// import mongoose from "mongoose"

// const connectDB=()=>{
//     mongoose.connect("mongodb+srv://vanshita222003:Klawclaw_22@mitrc.onxuacg.mongodb.net/bloging")
    
// .then(()=>{
//     console.log("successfully connected to mongodb")
// }).catch((e)=>{
//     console.log(e)
// })
// }





// export default connectDB


import mongoose from "mongoose";

const connectDB = () => {
    // First database connection
    mongoose
        .connect("mongodb+srv://vanshita222003:Klawclaw_22@mitrc.onxuacg.mongodb.net/bloging")
        .then(() => {
            console.log("Successfully connected to the first database blogging");
        })
        .catch((e) => {
            console.log("Error connecting to the first database:", e);
        });

    }

export default connectDB;



