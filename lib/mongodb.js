import mongoose from "mongoose";
const connection = {};
const connectMongoDB = async () => {

   try {
      if (connection.isConnected) {
         
         return;
      }

      const db = await mongoose.connect(process.env.MONGODB_URI)
      
      connection.isConnected = db.connections[0].readyState;

   } catch (error) {
      console.log(error);
      throw new Error(error)
   }
}
export default connectMongoDB;