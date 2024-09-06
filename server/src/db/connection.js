import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const dbConnectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.DB_NAME}`
    );
    console.log(`Database Connected: ${dbConnectionInstance.connection.host}`);
  } catch (error) {
    console.log(
      "Some error occurred while connecting to database",
      error.message
    );
  }
};

export default connectDB;
