const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const app = express();

const PORT = 3000;

mongoose.
  connect("mongodb+srv://ruhela7777:Vdo5zzz1NY7jRTlm@cluster0.dolftvr.mongodb.net/")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log(err));

const contactListRouter = require("./routes/contactListRoutes");
const importRouter = require("./routes/importRoutes");

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


app.listen(PORT, () => {
  console.log("Server is running at port " + PORT);
});