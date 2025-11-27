import mongoose from "mongoose";

export const  connectDB = async () =>{

    await mongoose . connect ('mongodb+srv://iamankumar279:2709ak47@cluster0.zhiem.mongodb.net/food-del').then ( ( )=>console. log( "DB Connected" ));
   
}


