import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,  // 5 seconds timeout
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.error(`Database connection error: ${err}`);
      process.exit(1);  // Exit process with failure
    });
};
