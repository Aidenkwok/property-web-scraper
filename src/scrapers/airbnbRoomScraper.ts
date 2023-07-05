import puppeteer from "puppeteer";
import {
  getBathroomNumberFromDescription,
  getBedroomNumberFromDescription,
  descriptionSelector,
  propertyNameSelector,
  propertyTypeSelector,
  amenitiesButtonSelector,
  getPropertyTypeFromTitle,
  amenitiesListSelector,
  singleRoomDescriptionSelector,
} from "../utils/airbnbHelpers/airbnbHelpers";

export const airbnbRoomScraper = async (
  url: string | undefined
): Promise<void> => {
  try {
    // check if url is provided
    if (!url) {
      throw Error("please provide a url of a room on Airbnb");
    }

    // open up a headless browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle0" });

    // check if room still exists
    if (page.url() === url) {
      throw Error("this room does not exist");
    }

    // get property name
    const propertyName = await page.$eval(
      propertyNameSelector,
      (element) => element.textContent?.trim() || ""
    );

    // get property title
    const title = await page.$eval(propertyTypeSelector, (element) =>
      element.textContent?.trim()
    );

    // if room is shared then the description is different
    const isSingleRoom = title?.includes("Room in");

    // get property description
    const description = await page.$eval(
      isSingleRoom ? singleRoomDescriptionSelector : descriptionSelector,
      (element) => element.textContent?.trim()
    );

    // click see all amenities
    await page.$eval(amenitiesButtonSelector, (element) => {
      element.click();
    });

    // wait for dialog to appear
    await page.waitForSelector(amenitiesListSelector, { visible: true });

    // get all amenities
    const amenitiesList = await page.$$eval(
      amenitiesListSelector,
      (elements) => {
        return elements.reduce((acc: string[], section): string[] => {
          const list = [...section.childNodes];
          const sectionItems = list
            // filter out subheadings and not included
            .filter((item, index) => {
              return (
                item.textContent !== "Not included" &&
                !item.textContent?.includes("Unavailable:") &&
                index !== 0
              );
            })
            .map((item) => item.textContent?.trim() ?? "");

          return [...acc, ...sectionItems];
        }, []);
      }
    );

    // extract data from description and title
    const bedrooms = getBedroomNumberFromDescription(description);
    const bathrooms = getBathroomNumberFromDescription(
      description,
      isSingleRoom
    );
    const propertyType = getPropertyTypeFromTitle(title);

    // log out all data
    console.log(`Property Name: ${propertyName}`);
    console.log(`Property type: ${propertyType}`);
    console.log(`Bedrooms: ${bedrooms}`);
    console.log(`Bathrooms: ${bathrooms}`);
    console.log(`Amenities: ${amenitiesList.join(", ")}`);

    await browser.close();
    process.exit();
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
};
