require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();

const mongodb_sting = process.env.MONGODB_STRING || '';

mongoose
  .connect(mongodb_sting,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("db conectado"))
  .catch((err) => console.log(err));

const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use(
  "/files",
  express.static(
    path.resolve(__dirname, "..", "uploads")
  )
);
app.use("/", routes);

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`listening on ${port}`);
});
