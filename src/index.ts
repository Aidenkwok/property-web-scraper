import { airbnbRoomScraper } from "./scrapers/airbnbRoomScraper";

const {
  _: [url],
} = require("minimist")(process.argv.slice(2));

airbnbRoomScraper(url);
