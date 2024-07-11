const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = 3000;

// File path to data.json
const dataPath = path.join(__dirname, "data.json");
app.use(cors());
app.use(express.json());
// Route to get labels as JSON array
app.get("/getlabels", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to read data" });
      return;
    }
    const jsonData = JSON.parse(data);
    res.json(jsonData.labels);
  });
});

// Route to get meals as JSON array
app.get("/getmeals", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to read data" });
      return;
    }
    const jsonData = JSON.parse(data);
    res.json(jsonData.meals);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
