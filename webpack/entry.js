import { Hct } from "@material/material-color-utilities";

const color = Hct.fromInt(0xff4285f4);
console.log(`Hue: ${color.hue}`);
console.log(`Chrome: ${color.chroma}`);
console.log(`Tone: ${color.tone}`);
