// // lib/mongoose.js
// import mongoose from "mongoose";

// export async function initMongoose() {
//     if (mongoose.connection.readyState === 1) {
//         return mongoose.connection.asPromise();
//     }
    
//     try {
//         await mongoose.connect(process.env.MONGODB_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('MongoDB connected');
//     } catch (error) {
//         console.error('MongoDB connection error:', error);
//         throw new Error('Database connection failed');
//     }
// }


import mongoose from 'mongoose';

export async function initMongoose() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            // No need to include useNewUrlParser or useUnifiedTopology
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};
