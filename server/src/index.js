import dotenv from 'dotenv';

import { app } from './app.js';
import { EnvConfig } from './config/env.config.js';
import connectDB from './db/index.js';

dotenv.config();

connectDB()
  .then(() => {
    app.listen(EnvConfig.PORT || 8000, () => {
      console.log(`Server is running at port : ${EnvConfig.PORT}`);
    });
  })
  .catch(err => {
    console.log('MONGO db connection failed !!! ', err);
  });
