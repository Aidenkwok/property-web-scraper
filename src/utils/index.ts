const {
  _: [url],
} = require("minimist")(process.argv.slice(2));

console.log(url);
