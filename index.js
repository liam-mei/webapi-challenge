require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const server = express();

// You can list out all the middleware in a row or in separate lines
server.use(express.json(), helmet(), morgan("dev"));

server.get("/", (req, res) => {
  res.json({ sanityCheck: "I work", envMessage: process.env.MESSAGE || "env not working/undefined" });
});

// Routers


// global error handling
server.use((req, res) => res.status(404).json({ error: "route not found" }));

server.use((err, req, res, next) => {
  res.status(500).json({ errorMessage: "some error occurred, please try again later", err });
});


const port = process.env.PORT || 8080
server.listen(port, () => {
  console.log(`\n*** server listening on port: ${port} *** \n`)
})