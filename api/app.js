require("dotenv").config();
const express = require("express");
const router = require("./routes/api_router");
const cors = require("cors");
var mongoose = require("mongoose");
const errorMiddleware = require("./middlewares/error-middleware");
var PORT = process.env.PORT || 5001;

var app = express();
app.use(
  cors({
    credentials: true,
    origin: [process.env.URL_CLIENT],
  })
);

const url = process.env.MONGODB_URL

app.use(express.json());
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(url)
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch(e) {
    console.log(e)
  }
};

start();
