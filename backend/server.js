const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Visit = require('./models/Visit');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/timetracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.post("/track", async (req, res) => {
  const { domain, duration } = req.body;
  await Visit.create({ domain, duration });
  res.sendStatus(200);
});

app.get("/summary", async (req, res) => {
  const agg = await Visit.aggregate([
    { $group: { _id: "$domain", totalTime: { $sum: "$duration" } } },
    { $project: { domain: "$_id", totalTime: { $divide: ["$totalTime", 60] } } } // mins
  ]);
  res.json(agg);
});

app.listen(3001, () => console.log("Backend running on port 3001"));
