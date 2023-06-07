const express = require("express");
const cors = require("cors");
const { router } = require("./controllers/shorter.router.js");
const { redisClient } = require("./utils/redis.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", router);

app.listen(4000, async () => {
  console.log("app is listeniing on port 4000...");

  await redisClient.connect();
});
