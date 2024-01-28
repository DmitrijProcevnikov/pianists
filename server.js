import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.static("public"));

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get("/getVariables", (req, res) => {
  const data = {
    token: process.env.TOKEN_TELEGRAM,
    chat_id: process.env.CHAT_ID,
  };
  res.json(data);
});
