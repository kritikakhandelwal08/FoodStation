import mongoose from "mongoose";
const resSchema = new mongoose.Schema({
    name: {
        type: String
    },
    location: { type: String},
    
  }, 
)


const exploreMenu = new mongoose.model('exploreMenu', resSchema)

export default exploreMenu;