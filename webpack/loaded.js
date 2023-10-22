import { argbFromHex } from "@material/material-color-utilities";
import { removeLoadScreen, cutsomThemeColor, themeImageProvider, contentPhotograph, currentPage } from "./app";
import { generateColorPalette, generateImagePalette } from "./_components/monet";

window.onload = () => {
  removeLoadScreen();
  if (cutsomThemeColor) {
    generateColorPalette(argbFromHex(cutsomThemeColor));
  } else {
    if (currentPage === "/") {
      const firstCarouselItem = document.querySelector("#JTM-S-Carousel-PostsList > a:nth-of-type(1) > img");
      themeImageProvider.src = firstCarouselItem.src;
    } else {
      themeImageProvider.src = contentPhotograph.src;
    }
    generateImagePalette(themeImageProvider);
  }
};
