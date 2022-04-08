const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");

const app = express();

app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/admin", adminRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
