if (process.env.NODE_ENV != "prodcution") require("dotenv").config();


const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const app = express();

mongoose.
  connect(process.env.DB_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log(err));

const contactListRouter = require("./routes/contactListRoutes");
const importRouter = require("./routes/importRoutes");
const downloadRouter = require("./routes/downloadRoutes");


app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, "views"));
app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.use(contactListRouter);
app.use(importRouter);
app.use(downloadRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is running at port " + process.env.PORT);
});