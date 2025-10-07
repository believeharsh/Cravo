// import dotenv from 'dotenv';
// import express from 'express';
// import cors from 'cors';
// import passport from 'passport';
// import errorHandler from './middlewares/error.middleware.js';
// import authRoute from './routes/auth.route.js';
// import categoryRoute from './routes/category.route.js';
// import path from 'path';
// import cookieParser from 'cookie-parser';
// import productRoute from './routes/product.route.js';
// import restaurantRoute from './routes/restaurant.route.js';
// import landingRoute from './routes/landing.route.js';
// import cityRoute from './routes/city.route.js';
// import configurePassport from './config/passport.config.js';
// import listRoute from './routes/list.route.js';
// import restaurantListRoute from './routes/restaurantList.route.js';
// import cartRoute from './routes/cart.route.js';
// import orderRoute from './routes/order.route.js';
// import addressRoute from './routes/address.route.js';
// import paymentRoute from './routes/payment.route.js';
// import restaurantSuperAdminRoute from './routes/superAdmin/restaurantSuperAdmin.route.js';

// dotenv.config();

// const app = express();

// app.use(
//   cors({
//     // origin: ['http://localhost:5173', 'http://localhost:5174'],
//     origin: process.env.CLIENT_URL,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
//     credentials: true,
//   })
// );

// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

// app.use(cookieParser());

// app.use(passport.initialize());
// configurePassport();

// app.use(express.static(path.resolve('./public')));

// app.use('/api/v1/auth', authRoute);
// app.use('/api/v1/categories', categoryRoute);
// app.use('/api/v1/cart', cartRoute);
// app.use('/api/v1/orders', orderRoute);
// app.use('/api/v1/products', productRoute);
// app.use('/api/v1/restaurants', restaurantRoute);
// app.use('/api/v1/landingResources', landingRoute);
// app.use('/api/v1/cities', cityRoute);
// app.use('/api/v1/lists', listRoute);
// app.use('/api/v1/restaurantList', restaurantListRoute);
// app.use('/api/v1/address', addressRoute);
// app.use('/api/v1/payments', paymentRoute);

// // super Admin Routes
// app.use('/api/v1/super-admin/restaurants', restaurantSuperAdminRoute);

// app.get('/', (req, res) => {
//   res.json('Hello, from server');
// });

// app.use(errorHandler);

// export { app };

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import errorHandler from './middlewares/error.middleware.js';
import authRoute from './routes/auth.route.js';
import categoryRoute from './routes/category.route.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import productRoute from './routes/product.route.js';
import restaurantRoute from './routes/restaurant.route.js';
import landingRoute from './routes/landing.route.js';
import cityRoute from './routes/city.route.js';
import configurePassport from './config/passport.config.js';
import listRoute from './routes/list.route.js';
import restaurantListRoute from './routes/restaurantList.route.js';
import cartRoute from './routes/cart.route.js';
import orderRoute from './routes/order.route.js';
import addressRoute from './routes/address.route.js';
import paymentRoute from './routes/payment.route.js';
import restaurantSuperAdminRoute from './routes/superAdmin/restaurantSuperAdmin.route.js';

dotenv.config();
const app = express();

// ✅ FIXED CORS Configuration
const allowedOrigins = [
  'https://cravo1.onrender.com', // Production frontend
  'http://localhost:5173', // Local dev (Vite)
  'http://localhost:5174', // Local dev alternate port
  'http://localhost:3000', // Local dev (CRA)
];

// Add CLIENT_URL from env if it exists
if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('❌ CORS blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// ✅ Handle preflight requests explicitly
app.options('*', cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
configurePassport();
app.use(express.static(path.resolve('./public')));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/cart', cartRoute);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/restaurants', restaurantRoute);
app.use('/api/v1/landingResources', landingRoute);
app.use('/api/v1/cities', cityRoute);
app.use('/api/v1/lists', listRoute);
app.use('/api/v1/restaurantList', restaurantListRoute);
app.use('/api/v1/address', addressRoute);
app.use('/api/v1/payments', paymentRoute);

// super Admin Routes
app.use('/api/v1/super-admin/restaurants', restaurantSuperAdminRoute);

app.get('/', (req, res) => {
  res.json({ message: 'Hello, from server', status: 'OK' });
});

// ✅ Health check endpoint for debugging
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    allowedOrigins: allowedOrigins,
    clientUrl: process.env.CLIENT_URL || 'Not set',
  });
});

app.use(errorHandler);

export { app };
