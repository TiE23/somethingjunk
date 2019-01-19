const unitWorder = (value, words, readabilityHelper = false) => {
  if (readabilityHelper) {
    let unit;
    if (words.singular === "inch") unit = "in";
    else if (words.singular === "ounce") unit = "oz";
    else if (words.singular === "fluid ounce") unit = "floz";

    if (unit) {
      const readableString = unitReadabilityHelper(value, unit);
      if (readableString) {
        return readableString;
      }
      // If not, will return normally at the end of this function.
    }
  }

  return `${value.toLocaleString()} ${value === 1 ? words.singular : words.plural}`;
};

const unitReadabilityHelper = (value, unit) => {
  // "30 inches" => "2 feet, 6 inches (30in)" - At least more than 24 in.
  if (unit === "in" && value > 24) {
    return `${unitWorder(Math.floor(value / 12), { singular: "foot", plural: "feet" })}, ${unitWorder(value % 12, { singular: "inch", plural: "inches" })} (${value}${unit})`;

  // "45 ounces" => "2 pounds, 13 ounces (45oz)" - At least more than 16 oz.
  } else if (unit === "oz" && value > 16) {
    return `${unitWorder(Math.floor(value / 16), { singular: "pound", plural: "pounds" })}, ${unitWorder(value % 16, { singluar: "ounce", plural: "ounces" })} (${value}${unit})`;

  // "60 fluid ounces" => "1 quart, 28 ounces (60floz)" - At least more than 40 floz.
  // I use "ounces" instead of "fluid ounces" to save space as it can be determined by context.
  } else if (unit === "floz" && value > 40 && value < 128) {
    return `${unitWorder(Math.floor(value / 32), { singular: "quart", plural: "quarts" })}, ${unitWorder(value % 32, { singluar: "ounce", plural: "ounces" })} (${value}${unit})`;

  // "200 fluid ounces" => "1 gallon, 2 quarts, 8 ounces (200floz)" - At least 128 floz.
  // I use "ounces" instead of "fluid ounces" to save space as it can be determined by context.
  } else if (unit === "floz" && value >= 128) {
    const gallonValue = Math.floor(value / 128);
    const quartValue = Math.floor((value - (gallonValue * 128)) / 32);
    const ounceValue = value % 32;

    // If there are 0 quarts it will not mention them.
    // Ex: 256floz would become "2 gallons, 0 ounces (256floz)"
    return `${unitWorder(gallonValue, { singular: "quart", plural: "quarts" })}, ${quartValue ? `${unitWorder(quartValue, { singluar: "quart", plural: "quarts" })},` : ""} ${unitWorder(ounceValue, { singluar: "fluid ounce", plural: "fluid ounces" })} (${value}${unit})`;
  }

  return null;
};

console.log(unitReadabilityHelper(12, "in"));
console.log(unitReadabilityHelper(52, "in"));
console.log(unitReadabilityHelper(12, "oz"));
console.log(unitReadabilityHelper(52, "oz"));
console.log(unitReadabilityHelper(12, "floz"));
console.log(unitReadabilityHelper(52, "floz"));
console.log(unitReadabilityHelper(128, "floz"));
console.log(unitReadabilityHelper(130, "floz"));
console.log(unitReadabilityHelper(200, "floz"));
