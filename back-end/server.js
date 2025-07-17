import express from 'express';
import cors from 'cors';
import connectDB from './Database/Connect.js';
import Emp from './Database/UserSchema.js';
import router from './Routes/userRoute.js';

const app = express();
const PORT =  8000;

app.use(cors());
app.use(express.json());


// sample route to test the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get('/', (req, res) => {
  res.send('Welcome to innexoft task');
});

// db connection
connectDB();


// route 

app.use('/api',router) 