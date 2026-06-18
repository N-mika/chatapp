import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
const connectDB = async () => {
  let mongoUri = process.env.MONGO_URI
  try {
    if(mongoUri){
      await mongoose.connect(mongoUri);
      console.log("MongoDB connecté !");
    }
    else {
      console.log("mongoUri n'existe pas" , mongoUri)
    }
  } catch (err) {
    console.error("Erreur MongoDB :", (err as Error).message);
    process.exit(1);
  }
};

export default connectDB;