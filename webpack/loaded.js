import { argbFromHex } from "@material/material-color-utilities";
import { removeLoadScreen, customThemeColor, themeImageProvider, contentPhotograph, currentPage, randomRotationBullet } from "./app";
import { generateColorPalette, generateImagePalette } from "./_components/monet";

window.onload = () => {
  randomRotationBullet();

  setTimeout(() => {
    removeLoadScreen();

    setTimeout(() => {
      if (customThemeColor) {
        generateColorPalette(argbFromHex(customThemeColor));
      } else {
        if (currentPage === "/") {
          const firstCarouselItem = document.querySelector("#JTM-S-Carousel-PostsList > a:nth-of-type(1) > img");
          themeImageProvider.src = firstCarouselItem.src;
        } else {
          themeImageProvider.src = contentPhotograph.src;
        }
        generateImagePalette(themeImageProvider);
      }
    }, 1000);
  }, 500);
};
