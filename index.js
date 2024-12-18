const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(express.json(), cors());

app.get("/", (req, res) => {
  return res.json({ message: "home page" });
});

app.get("/risk-questions", (req, res) => {
  return res.json({
    statusCode: 200,
    message: "Get all Risk Capacity Questionnaire successfully!",
    data: [
      {
        id: 1,
        question: "Number of year until retirement?",
        options: [
          {
            score: 0,
            value: "Less than 5 years",
          },
          {
            score: 1,
            value: "5-15 years",
          },
          {
            score: 2,
            value: "15-20 years",
          },
          {
            score: 3,
            value: "20-25 years",
          },
          {
            score: 4,
            value: "more than 25 years",
          },
        ],
        order: 1,
        is_active: true,
        createdAt: "2024-08-23T09:08:15.272Z",
        updatedAt: "2024-08-23T09:08:15.272Z",
      },
      {
        id: 2,
        question: "Which of the following objectives is important to you?",
        options: [
          {
            score: 1,
            value: "Preserving wealth",
          },
          {
            score: 2,
            value: "Creating wealth",
          },
          {
            score: 3,
            value: "Balanced income and long term growth",
          },
          {
            score: 4,
            value: "Generating income regularly to meet current requirements",
          },
          {
            score: 5,
            value: "Long term growth",
          },
        ],
        order: 2,
        is_active: true,
        createdAt: "2024-08-23T09:14:42.839Z",
        updatedAt: "2024-08-23T09:14:42.839Z",
      },
      {
        id: 3,
        question:
          "Which of the following describes your understanding of the financial markets?",
        options: [
          {
            score: 3,
            value:
              "An experienced investor stays market-savvy, diversifies across asset classes, and understands the risks for high returns.",
          },
          {
            score: 2,
            value:
              "Limited financial market awareness; rely on professionals for updates.",
          },
          {
            score: 1,
            value: "Limited investment knowledge, but eager to learn more.",
          },
        ],
        order: 3,
        is_active: true,
        createdAt: "2024-08-23T09:14:57.277Z",
        updatedAt: "2024-08-23T09:14:57.277Z",
      },
      {
        id: 4,
        question:
          "Given below is a listing of investment choices from least risky to most risky. Which is the riskiest option you have invested in?",
        options: [
          {
            score: 0,
            value: "Savings Account/FD/Money Market Funds",
          },
          {
            score: 1,
            value: "Bonds/Debt MFs",
          },
          {
            score: 2,
            value: "Equity MFs, Equity shares/Structured products",
          },
          {
            score: 3,
            value: "RE funds/ Commodity linked products",
          },
          {
            score: 4,
            value: "PE and VC funds",
          },
        ],
        order: 4,
        is_active: true,
        createdAt: "2024-08-23T09:15:03.059Z",
        updatedAt: "2024-08-23T09:15:03.059Z",
      },
      {
        id: 5,
        question: "How would you describe yourself as a risk-taker?",
        options: [
          {
            score: 3,
            value: "Willing to take risks for higher return",
          },
          {
            score: 2,
            value: "Can take calculated risks",
          },
          {
            score: 1,
            value: "Low risk taking capability",
          },
          {
            score: 0,
            value: "Extremely averse to risk",
          },
        ],
        order: 5,
        is_active: true,
        createdAt: "2024-08-23T09:15:09.270Z",
        updatedAt: "2024-08-23T09:15:09.270Z",
      },
      {
        id: 6,
        question:
          "How much short-term volatility are you willing to accept for higher returns in a growth-focused portfolio?",
        options: [
          {
            score: 3,
            value: "Comfortable with risk for higher returns",
          },
          {
            score: 2,
            value: "Somewhat comfortable with limited volatility",
          },
          {
            score: 1,
            value: "Uncomfortable with investment fluctuations.",
          },
          {
            score: 0,
            value: "Prefer minimal volatility investments.",
          },
        ],
        order: 6,
        is_active: true,
        createdAt: "2024-08-23T09:15:15.014Z",
        updatedAt: "2024-08-23T09:15:15.014Z",
      },
      {
        id: 7,
        question:
          "What percentage of your total Net Assets will you wish to invest through Creddinv Technologies?",
        options: [
          {
            score: 1,
            value: "Less than 25%",
          },
          {
            score: 2,
            value: "25% - 50%",
          },
          {
            score: 3,
            value: "Greater than 50%",
          },
        ],
        order: 7,
        is_active: true,
        createdAt: "2024-08-23T09:15:21.575Z",
        updatedAt: "2024-08-23T09:15:21.575Z",
      },
    ],
  });
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
