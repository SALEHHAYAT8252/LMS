import mongoose from "mongoose";
export const connectDB=()=>{
    mongoose
    .connect(process.env.MONGO_URI,{
        dbName:"LMS",
    })
    .then(()=>{
        console.log("Database connected succesfully");
    })
    .catch((err)=>{
        console.log("Error occuring connecting to database",err)
    });
}