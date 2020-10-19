import mongoose from 'mongoose';

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, configOptions);
    console.log(`MongoDB connected to ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`MongoDB Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
