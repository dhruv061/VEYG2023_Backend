const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const path = require("path");
app.use(cors());
//import file from the other file structure
const authorRouter = require("./routers/auth");

const DB =
  "mongodb+srv://veyg:veyg123@cluster0.9xhl3gb.mongodb.net/VEYG?retryWrites=true&w=majority";

//if we use local then it's get 3000 otherwise they automatically
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(authorRouter);

// Serve index.html from the root directory
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


//Database connections
mongoose.set("strictQuery", false);
mongoose
  .connect(DB)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((e) => {
    console.log(e);
  });

//listen port
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Connection make succefullay at ${PORT}`);
});
