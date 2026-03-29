import fs from "fs";

const light = JSON.parse(fs.readFileSync("./tokens/Light.tokens.json", "utf-8"));
const dark = JSON.parse(fs.readFileSync("./tokens/Dark.tokens.json", "utf-8"));

function extractTokens(obj, prefix = "") {
  let result = {};

  for (const key in obj) {
    const value = obj[key];

    if (value?.$value?.hex) {
      const varName = prefix + key.replace(/\s+/g, "-");
      result[varName] = value.$value.hex;
    } else if (typeof value === "object") {
      const nested = extractTokens(value, `${prefix}${key}-`);
      result = { ...result, ...nested };
    }
  }

  return result;
}

function toCSSVariables(tokens) {
  return Object.entries(tokens)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join("\n");
}

const lightTokens = extractTokens(light);
const darkTokens = extractTokens(dark);

const css = `
:root {
${toCSSVariables(lightTokens)}
}

.dark {
${toCSSVariables(darkTokens)}
}
`;

fs.writeFileSync("./src/styles/tokens.css", css);

console.log("tokens.css generated");