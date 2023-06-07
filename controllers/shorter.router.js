const express = require("express");
const path = require("path");
const {
  createUrlController,
  redirectOrFailedUrlController,
} = require("./shorter.controller.js");

const router = express.Router();

router.get("/", (_, res) => {
  res.status(200).sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/:url", redirectOrFailedUrlController);

router.post("/api/url", createUrlController);

router.get("/error/404", (_, res) => {
  res.status(200).sendFile(path.join(__dirname, "..", "views", "404.html"));
});

module.exports = { router };
