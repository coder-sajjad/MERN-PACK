import mongoose from "mongoose";


// Create MongoDB connection
const mongoDBConnect = async (req, res, next) => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_STRING);
        console.log(`MongoDB Connection successful`.bgBlue.black);
    } catch (error) {
        console.log(error);
    }
};

export default mongoDBConnect;