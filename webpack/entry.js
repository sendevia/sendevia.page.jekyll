import { applyTheme, themeFromImage } from "@material/material-color-utilities";

const img = new Image();
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

img.src = document.querySelector("#header_image").src;

const theme = themeFromImage(img);
theme.then(function (result) {
  applyTheme(result, { target: document.body, dark: systemDark });
});
