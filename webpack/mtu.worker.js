import { argbFromHex, themeFromSourceColor } from "@material/material-color-utilities";

self.onmessage = ({ data: { cutsomThemeColor } }) => {
  
  const theme = themeFromSourceColor(argbFromHex(cutsomThemeColor));
  console.log(cutsomThemeColor);
  console.log(theme);

  self.postMessage(theme)
};
