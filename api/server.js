const express = require("express");
const projectRouter = require("./projectRouter");
const actionRouter = require("./actionRouter");

const server = express();
server.use(express.json());
server.use(logger);
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get("/", (req, res) => {
  res.send(`<h2> home page </h2>`);
});

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}  )}`
  );
  next();
}

module.exports = server;
