const express = require("express");
const path = require('path')
const cors = require("cors");

const mongoose = require('mongoose');
const AppData = require("./model/AppData");
const uri = "mongodb://localhost:27017/lunch"
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
//mongoose.set('debug', true);
const connection = mongoose.connection;

const router = require("./routes/routes");
const PORT = 3005;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
//app.use(express.raw({type: "application/json"}));
app.use(express.json());
app.use("/", router);

connection.once('open', () => {
    console.log('👍Successfully connected to MongoDB👍');
});

app.listen(PORT, function () {
    console.log(`🚀The Backend Server is up and running on port ${PORT}🚀`);
});