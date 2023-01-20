const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

// create express app
const app = express();

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

app.get("/json", (req, res) => {
  const data = fs.readFileSync("./data.json");
  const jsonObj = JSON.parse(data);
  return res.json({
    data: jsonObj,
  });
});

app.post("/update", (req, res) => {
  const { id, one, two } = req.body;
  const data = fs.readFileSync("./data.json");
  const jsonObj = JSON.parse(data);
  for (let item of jsonObj) {
    if (item.id === id) {
      item.one = one;
      item.two = two;
      break;
    }
  }
  fs.writeFile("./data.json", JSON.stringify(jsonObj), err => {
    console.log("err", err);
  });
  return res.json({
    data: jsonObj,
  });
});

// listen for requests
app.listen(4000, () => {
  console.log("Server is listening on port ", 4000);
});
