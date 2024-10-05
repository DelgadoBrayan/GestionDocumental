import mongoose from "mongoose";

const connectionDB = async ()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1/globantDB')
        console.log("connect successfely")
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectionDB;