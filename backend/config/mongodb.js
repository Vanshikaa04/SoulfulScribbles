import mongoose from "mongoose"; 

// const connectDB = async()=>{

//     mongoose.connection.on('connected' ,()=>{
//         console.log("DB Connected");
//     })
    
//     await mongoose.connect(`${process.env.MONGODB_URI}`)

// }
// export default connectDB

// const mongoose = require('mongoose');

let isConnected = false;

const connectDB= async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'user',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = db.connections[0].readyState;
        console.log('MongoDB is connected');
    } catch (error) {
        console.log(error);
    }
};

export default connectDB
