const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res) => {
  const { date } = req.params;
  let newDate;
  if (!date) {
    newDate = new Date();
  } else {
    const checkUnix = date * 1;
    newDate = isNaN(checkUnix) ? new Date(date) : new Date(checkUnix);
  }
  if (newDate === "Invalid Date") {
    res.json({
      error: "Invalid Date",
    });
  } else {
    const unix = newDate.getTime();
    const utc = newDate.toUTCString();
    res.json({
      unix: unix,
      utc: utc,
    });
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
