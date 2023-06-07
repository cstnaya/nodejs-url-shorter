const hash = require("object-hash");

// create new hash
async function generateHash(url) {
  return new Promise((resolve, reject) => {
    try {
      const hashResult = hash(url);
      resolve(hashResult);
    } catch (e) {
      return reject(e);
    }
  });
}

module.exports = { generateHash };
