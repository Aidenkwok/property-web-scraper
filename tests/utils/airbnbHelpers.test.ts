import {
  getBathroomNumberFromDescription,
  getBedroomNumberFromDescription,
  getPropertyTypeFromTitle,
} from "../../src/utils/airbnbHelpers/airbnbHelpers";

describe("getPropertyTypeFromTitle", () => {
  test("should return empty string when title is undefined", () => {
    const result = getPropertyTypeFromTitle(undefined);
    expect(result).toEqual("");
  });

  test('should return the property type before "hosted by"', () => {
    const title = "Entire apartment hosted by John";
    const result = getPropertyTypeFromTitle(title);
    expect(result).toEqual("Entire apartment ");
  });

  test('should return the whole title when "hosted by" is not present', () => {
    const title = "Cozy cabin in the woods";
    const result = getPropertyTypeFromTitle(title);
    expect(result).toEqual(title);
  });
});

describe("getBedroomNumberFromDescription", () => {
  test("should return empty string when description is undefined", () => {
    const result = getBedroomNumberFromDescription(undefined);
    expect(result).toEqual("");
  });

  test("should return bedroom number when description contains a valid format", () => {
    const description =
      "This beautiful apartment has 2 bedrooms and a spacious living room.";
    const result = getBedroomNumberFromDescription(description);
    expect(result).toEqual("2");
  });

  test("should return empty string when description does not match the regex pattern", () => {
    const description = "Enjoy your stay in this cozy cabin.";
    const result = getBedroomNumberFromDescription(description);
    expect(result).toEqual("");
  });
});

describe("getBathroomNumberFromDescription", () => {
  test("should return empty string when description is undefined and isSingleRoom is not provided", () => {
    const result = getBathroomNumberFromDescription(undefined);
    expect(result).toEqual("");
  });

  test("should return empty when description is undefined and isSingleRoom is true", () => {
    const result = getBathroomNumberFromDescription(undefined, true);
    expect(result).toEqual("");
  });

  test("should return bathroom number when description contains a valid format and isSingleRoom is not provided", () => {
    const description = "This spacious apartment has 2 bathrooms.";
    const result = getBathroomNumberFromDescription(description);
    expect(result).toEqual("2");
  });

  test("should return bathroom number when description contains a valid format and isSingleRoom is false", () => {
    const description = "This beautiful house has 3 bathrooms.";
    const result = getBathroomNumberFromDescription(description, false);
    expect(result).toEqual("3");
  });

  test("should return single room bathroom description when description contains a valid format and isSingleRoom is true", () => {
    const description = "This cozy room has aPrivate bathroom.";
    const result = getBathroomNumberFromDescription(description, true);
    expect(result).toEqual("Private bathroom");
  });

  test("should return empty string when description does not match the regex pattern and isSingleRoom is not provided", () => {
    const description = "Enjoy your stay in this lovely cottage.";
    const result = getBathroomNumberFromDescription(description);
    expect(result).toEqual("");
  });

  test("should return 0 when description does not match the regex pattern and isSingleRoom is true", () => {
    const description = "This single room has a shared bathroom.";
    const result = getBathroomNumberFromDescription(description, true);
    expect(result).toEqual("");
  });
});
