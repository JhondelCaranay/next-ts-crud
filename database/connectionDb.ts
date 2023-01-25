// MONGO_URI
import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI || "";

// /**
//  * Global is used here to maintain a cached connection across hot reloads
//  * in development. This prevents connections growing exponentially
//  * during API Route usage.
//  */

// var global: any = typeof global !== "undefined" ? global : {};

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose.connect(MONGO_URI!, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default dbConnect;

const connectionDb = async () => {
  // console.log("🚀 MONGO_URI", MONGO_URI);
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGO_URI);
    // console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectionDb;
