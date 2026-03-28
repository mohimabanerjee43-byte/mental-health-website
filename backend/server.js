const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const user = { username: "admin", password: "1234" };

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.json({ success: username === user.username && password === user.password });
});

app.post("/analyze", (req, res) => {
  const answers = req.body.answers;

  let anxiety = 0;
  let depression = 0;

  answers.forEach(a => {
    if (a.type === "anxiety") anxiety += a.value;
    else depression += a.value;
  });

  const anxietyPercent = ((anxiety / 18) * 100).toFixed(1);
  const depressionPercent = ((depression / 27) * 100).toFixed(1);

  res.json({
    anxiety: anxietyPercent,
    depression: depressionPercent
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));