import mongoose from 'mongoose';
import { Db_Name } from '../constants.js';
import { EnvConfig } from '../config/env.config.js';

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${EnvConfig.MONGO_URI}/${Db_Name}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log('MONGODB connection FAILED ', error);
    process.exit(1);
  }
};

export default connectDB;
