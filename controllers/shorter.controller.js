const validUrl = require("valid-url");
const { findUrl, createUrl } = require("../models/shorter.model.js");

const HOST = process.env.HOST || "http://localhost:4000";

async function redirectOrFailedUrlController(req, res) {
  const hashUrl = req.params.url;

  const originUrl = await findUrl(hashUrl);

  if (originUrl) {
    res.redirect(originUrl);
  } else {
    res.redirect("/error/404");
  }
}

async function createUrlController(req, res) {
  const { url } = req.body;

  if (validUrl.isUri(url)) {
    // generate or display existed hash url
    const hash = await createUrl(url);

    res.status(200).send({ url: HOST + "/" + hash });
  } else {
    return res.status(401).send({ error: "The url format is invalid." });
  }
}

module.exports = { createUrlController, redirectOrFailedUrlController };
