import mongoose from "mongoose";
const resSchema = new mongoose.Schema({
    name: {
        type: String
    },
    location: { type: String},
    
  }, 
)


const homeMade = new mongoose.model('meals', resSchema)

export default homeMade;