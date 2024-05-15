const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes/index");
const config = require(`${__dirname}/configs/config.json`);
const mysqlConnection = require(`${__dirname}/helper/mysqlHelper`);
const cors = require("cors");

app.use(cors());
global.DB = mysqlConnection;
app.use(bodyParser.json({ limit: "30mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/", routes);

app.listen(config.PORT, () => {
  console.log(`Student Service Running on ${config.PORT}`);
});
