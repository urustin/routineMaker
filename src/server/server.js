// server.js

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const todosRouter = require('./api/todos.js');
const { resetTodos } = require('./resetTodos.js');

const app = express();
app.use(express.json());
const uri = process.env.MONGO_URI;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(uri, options)
    .then(() => {
        console.log('Successfully connected to MongoDB!');
        console.log(`Database name: ${mongoose.connection.db.databaseName}`);
    })
    .catch(error => console.error('Connection error', error));

// app.use(cors({
//     origin: 'http://localhost:19006',
//     credentials: true
// }));
app.use(cors());


app.use('/api/todos', todosRouter);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// You can now use the `Todo` model to interact with the 'todos' collection in your database

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// cron

resetTodos();
