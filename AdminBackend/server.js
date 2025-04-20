import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodroute.js"
import dotenv from "dotenv"
import oderRoute from "./routes/orderRoute.js"

//app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();
dotenv.config();

// api endpont
app.use("/api/food", foodRouter)
app.use('/uploads', express.static('uploads'));
app.use("/api",oderRoute)
// app.use('/api/auth', authRoutes);
// app.use("/images", express.static)


app.get("/",(req,res)=>{
    res.send("API Working")

})

app.listen(port,()=>{
  console.log(`Server Started on http://localhost:${port}`)
  
})
//mongodb+srv://recipe:3SE4s*vqAt9_v95@cluster0.ozmpaxa.mongodb.net/