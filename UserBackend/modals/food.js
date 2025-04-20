import mongoose from "mongoose"


const foodSchema = new mongoose.Schema({
    title: {
        type: String
    },
  }, 
)


const food = new mongoose.model('foods', foodSchema)


export default food
