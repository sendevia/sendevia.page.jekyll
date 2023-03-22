import { themeFromSourceColor, applyTheme } from "@material/material-color-utilities";

function getMainColor(img) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, img.width, img.height).data;

  let r = 0,
    g = 0,
    b = 0;
  for (let i = 0; i < imageData.length; i += 4) {
    r += imageData[i];
    g += imageData[i + 1];
    b += imageData[i + 2];
  }
  r = Math.floor(r / (imageData.length / 4));
  g = Math.floor(g / (imageData.length / 4));
  b = Math.floor(b / (imageData.length / 4));

  return ((255 << 24) | ((r & 0x0ff) << 16) | ((g & 0x0ff) << 8) | (b & 0x0ff)) >>> 0;
}

const img = new Image();
img.src = document.querySelector("#header_image").src;
img.onload = () => {
  const mainColor = getMainColor(img);

  const theme = themeFromSourceColor(mainColor);

  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  applyTheme(theme, { target: document.body, dark: systemDark });
};
