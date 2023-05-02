const express = require("express");
const { connection } = require("./config/db");
const { UserRouter } = require("./routes/User.Router");
const { PostRouter } = require("./routes/Post.Router");

const app = express();
app.use("/users", UserRouter);
app.use("/posts", PostRouter);

app.use(express.json());

//routers
app.get("/home", async (req, res) => {
  try {
    res.send(`<h2> HOME ROUTER </h2>`);
  } catch (error) {
    console.log(error.message);
  }
});

// connection to server

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`app listening on port ${process.env.port}`);
  } catch (error) {
    console.log({ error: `error in connections with port: ${error.message}` });
  }
});
