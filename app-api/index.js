const express = require("express");
const cors = require("cors");

const tests = require("./routes/tests.js");
const initDb = require("./services/dbInit.js");

const app = express();

// Only in development mode
app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/tests", tests);

initDb();

app.listen(3009);
