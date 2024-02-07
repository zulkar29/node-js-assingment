import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './src/route/user.route.js'


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_VERSION= process.env.API_VERSION ||  '/v1/api';

//Global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
 });
mongoose.connection.on('error', (error) => console.error('MongoDB connection error:', error));


app.use(`${API_VERSION}/users`, userRoute);


// Health check endpoint

app.get(`${API_VERSION}/health`, (req, res) => {
  return res.status(200).json({ status: 'OK', message: 'Health check passed' });
});

app.get("/", (req, res) => {
  return res.status(200).json({ status: 'OK', message: 'This is base URL' });
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});