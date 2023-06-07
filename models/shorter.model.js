const { redisClient } = require("../utils/redis.js");
const { generateHash } = require("../utils/hash.js");

async function findUrl(hash) {
  try {
    return await redisClient.get(hash);
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function createUrl(url) {
  return new Promise(async (resolve, reject) => {
    try {
      // find existed hash first
      const hash = await generateHash(url);
      const existedUrl = await findUrl(hash);

      if (existedUrl) {
        resolve(hash);
      } else {
        await redisClient.setEx(hash, 60 * 60 * 24, url); // save one day
        resolve(hash);
      }
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = { findUrl, createUrl };
