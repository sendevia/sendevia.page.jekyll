import { argbFromHex } from "@material/material-color-utilities";
import { removeLoadScreen, cutsomThemeColor, themeImageProvider, contentPhotograph } from "./app";
import { generateColorPalette, generateImagePalette } from "./_components/monet";

window.onload = () => {
  removeLoadScreen();
  if (cutsomThemeColor) {
    generateColorPalette(argbFromHex(cutsomThemeColor));
  } else {
    themeImageProvider.src = contentPhotograph.src;
    generateImagePalette(themeImageProvider);
  }
};
