const express = require("express");

const app = express();

const port = 3000;

app.use("/", require("./routes"));

app.listen(port, () => {
  console.log(`My Web Server Listening on port: ${port}`);
});
