import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRoute from './routes/auth.route.js';
import categoryRoute from './routes/category.route.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import productRoute from './routes/product.route.js';
import restaurantRoute from './routes/restaurant.route.js';
import landingRoute from './routes/landing.route.js';
import cityRoute from './routes/city.route.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());
app.use(express.static(path.resolve('./public')));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/restaurants', restaurantRoute);
app.use('/api/v1/landingResources', landingRoute);
app.use('/api/v1/cities', cityRoute);

app.get('/', (req, res) => {
  res.json('Hello, from server');
});

export { app };
