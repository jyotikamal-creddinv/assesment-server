const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(express.json(), cors());

app.get("/risk-questions", (req, res) => {
  const data = fs.readFileSync("data.json", "utf-8");
  return res.json(JSON.parse(data));
});

app.post("/calculate-risk-score", (req, res) => {
  const { userScore } = req.body;
  if (!userScore) return res.status(400).send({ message: "Invalid payload!" });
  // maximum score is 25 as per the current data
  const maxScore = 25;
  let type = "Conservative";
  if (Math.floor((userScore * 100) / maxScore) <= 45) {
    type = "Conservative";
  } else if (Math.floor((userScore * 100) / maxScore) <= 70) {
    type = "Moderate";
  } else {
    type = "Aggressive";
  }
  return res.json({
    message: "risk score generated successfuly",
    data: {
      risk_score: userScore,
      risk_percentage: Math.floor((userScore * 100) / maxScore),
      type,
    },
  });
});

app.listen(3000, () => {
  console.log("server working on port 3000");
});
