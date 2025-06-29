const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

// require('dotenv').config();
// require('./Models/db');

const PORT = process.env.PORT || 3001;

// CORS Configuration
app.use(cors({
  origin: process.env.FRONTEND_URL , // Replace with your frontend URL
  credentials: true // Allow cookies and credentials
}));

app.get('/ping', (req, res) => {
  res.send('PONG');
});

app.use(bodyParser.json());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

// app.listen(PORT, ()=> {
//     console.log(`Server is running on ${PORT}`)
// })
