import {svgSrc, nonRepeatRandom} from "./svgs.js";

// Function to find attributes in the text area
export function findAttributes(text, name) {
    let result = {};
    // Find all attributes in the text area with the format [attribute]
    let regex = /\[(.*?)\]/g;
    let attributes = text.match(regex);

    //make sure attributes arent repeated
    let uniqueAttributes = [...new Set(attributes)];

    //nonRepeatRandom function located in ./helper/svgs.js
    let photoId = nonRepeatRandom(JSON.parse(localStorage.getItem("usedNumbers")));

    let template = text;

    // If there are no attributes, set the attributes to none
    if (!attributes) {
      result = {
        name: name,
        template: template,
        attributes: "none",
        photo: svgSrc[photoId],
      };
      return result;
    }
  
    // Construct the result object correctly using the name parameter
    result = {
      name: name,
      template: template,
      attributes: uniqueAttributes,
      photo: svgSrc[photoId],
    };
  
    return result;
  }