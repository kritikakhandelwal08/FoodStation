import mongoose from "mongoose";
const resSchema = new mongoose.Schema({
    name: {
        type: String
    },
    ingredients: {type: Array},
    price : {type: Number},
    calories: {type: Number},
    image : { type: String},
    
  }, 
)


const tiffinzone = new mongoose.model('tiffinzones', resSchema)

export default tiffinzone;