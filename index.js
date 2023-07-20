const express = require("express");

const app = express();

app.get("/", (req, res) => {
  const data = {
    name: "Harsh",
    isAwesome: true,
  };
  res.json(data);
});

app.get("/awesome-generator", (req, res) => {
  const { name, isAwesome } = req.query;
  res.send(`${name} is ${JSON.parse(isAwesome) ? "really" : "not"} awesome`);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Express running at : http://localhost:${port}`);
});
