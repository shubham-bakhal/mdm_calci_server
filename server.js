const dotenv = require("dotenv");
dotenv.config();
//
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const Data = require("./data.model");
require("./mongodb");

// create express app
const app = express();

console.log("port", process.env.MONGO_URL);
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["https://mdm-calci.vercel.app", "http://localhost:3000"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
  });
});

app.get("/json", async (req, res) => {
  const data = await Data.find();
  console.log(data);
  return res.status(200).json({
    data,
  });
});

app.post("/update", async (req, res) => {
  const { id, one, two } = req.body;
  const updatedData = await Data.findByIdAndUpdate(
    id,
    { one, two },
    { new: true }
  );
  const data = await Data.find();
  return res.status(201).json({
    data,
  });
});

app.post("/add", async (req, res) => {
  const { name, one, two } = req.body;
  const newData = await Data.create({ name, one, two });

  return res.status(201).json({
    data: newData,
  });
});

// listen for requests
app.listen(process.env.PORT || 4000, () => {
  console.log("Server is listening on port", process.env.PORT);
});
