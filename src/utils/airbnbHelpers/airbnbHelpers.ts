// regex
const bathroomRegex = /(\d+)\s*bathroom/;
const singleRoomBathroomRegex = /[A-Z][a-z]+\s+bathroom/;
const bedroomRegex = /(\d+)\s*bedroom/;

// selectors
export const propertyTypeSelector = "h2.hpipapi";
export const propertyNameSelector = "h1.i1pmzyw7";
export const singleRoomDescriptionSelector = "ul.c14pwv94";
export const descriptionSelector = "ol.lgx66tx";
export const amenitiesButtonSelector = "button.l1ovpqvx.b65jmrv.v7aged4";
export const amenitiesListSelector = "div._11jhslp";

// functions
export const getPropertyTypeFromTitle = (title?: string) => {
  return title?.split("hosted by")[0] || "";
};

export const getBedroomNumberFromDescription = (description?: string) => {
  return description?.match(bedroomRegex)?.[1] || "";
};

export const getBathroomNumberFromDescription = (
  description?: string,
  isSingleRoom?: boolean
) => {
  return isSingleRoom
    ? description?.match(singleRoomBathroomRegex)?.[0] || 0
    : description?.match(bathroomRegex)?.[1] || "";
};
