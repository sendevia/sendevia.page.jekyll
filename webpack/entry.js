import { themeFromSourceColor, applyTheme, argbFromHex } from "@material/material-color-utilities";

const theme = themeFromSourceColor(argbFromHex(document.body.getAttribute("color")));
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

applyTheme(theme, { target: document.body, dark: systemDark });
