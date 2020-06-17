//Required dependencies
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");

//Creating an Express Application
const app = express();

//Middlewares
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

//Importing routes
const authRoutes = require("./routes/authentication");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

//.env
require("dotenv").config();

//Connecting to mongodb
mongoose.connect(
  process.env.ATLAS_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  console.log("Connection established")
);
mongoose.Promise = global.Promise; //STUDY ABOUT all this

//Using middleware in app
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Using routes
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", postRoutes);

//Port
const port = process.env.PORT || 5000;

//Starting server
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is up and running at ${port}`);
});
