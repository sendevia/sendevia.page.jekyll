import { argbFromHex } from "@material/material-color-utilities";
import { generateColorPalette, generateImagePalette } from "./_components/monet";
import { contentPhotograph, currentPage, customThemeColor, randomRotationBullet, removeLoadScreen, themeImageProvider, createSnackbar } from "./app";

window.onload = () => {
  randomRotationBullet();

  document.querySelectorAll("#JTM-S-UniversalLayout-ContentFiller h1").forEach((h1) => {
    h1.addEventListener("click", function () {
      const anchorLink = this.id ? `#${this.id}` : "";

      if (anchorLink) {
        navigator.clipboard.writeText(window.location.href.split("#")[0] + anchorLink).then(() => createSnackbar(`已将内容复制到剪贴板：${anchorLink}`));
      }
    });
  });

  var testButton = document.getElementById("JTM-P-Components-Snackbar-Test");
  if (testButton) {
    testButton.addEventListener("click", function () {
      createSnackbar(testButton.innerText);
    });
  }

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
