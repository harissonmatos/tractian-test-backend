const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();

mongoose
  .connect(
    "mongodb+srv://tractian:cafe1234@cluster0.dzqoz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
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

app.listen(3333, function () {
  console.log("listening on 3333");
});
