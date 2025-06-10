const express = require("express");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const MAX_SEATS = 38;
const DATA_FILE = path.join(__dirname, "seats.json");

app.use(cookieParser());
app.use(express.static("public"));

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ assignedSeats: [] }, null, 2));
}

app.get("/entry", (req, res) => {
  const seatCookie = req.cookies.seat;

  if (seatCookie) {
    return res.send(renderHTML(seatCookie));
  }

  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  const used = data.assignedSeats;

  if (used.length >= MAX_SEATS) {
    return res.send("<h1>満席です</h1>");
  }

  const available = [...Array(MAX_SEATS).keys()].map(n => n + 1).filter(n => !used.includes(n));
  const assigned = available[Math.floor(Math.random() * available.length)];

  data.assignedSeats.push(assigned);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  res.cookie("seat", assigned, { maxAge: 7 * 24 * 60 * 60 * 1000 }); // 1週間有効
  res.send(renderHTML(assigned));
});

function renderHTML(number) {
  return `
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <title>席番号</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body { font-family: sans-serif; text-align: center; padding-top: 100px; background-color: #f9f9f9; }
        h1 { font-size: 2.5em; color: #333; }
      </style>
    </head>
    <body>
      <h1>あなたの席は ${number} 番です</h1>
    </body>
    </html>
  `;
}

app.listen(PORT, () => {
  console.log(`✅ サーバー起動中: http://34.232.26.4:${PORT}/entry`);
});
``
