require('dotenv').config();
const cors = require('cors');
const express = require('express');
const tasks = require('./routes/tasks');
const mongoose = require('mongoose');
const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000', // replace with react url
  })
);
app.use(express.json());
app.use('/api', tasks);

const connectMongoose = async () => {
  const port = process.env.PORT || 3000;
  try {
    await mongoose.connect(
      `mongodb+srv://taskAdmin:${process.env.PASSWORD}@cluster0.fi5le.mongodb.net/tasks?retryWrites=true&w=majority&appName=Cluster0`
    );

    console.log('Mongoose called...');

    app.listen(port, () => console.log(`Listening on port ${port}...`));
  } catch (error) {
    console.log('Failed to connect ' + error);
  }
};

connectMongoose();
