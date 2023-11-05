import { CorePalette, hexFromArgb, sourceColorFromImage } from "@material/material-color-utilities";
import { themeRoot } from "../app";

/**
 * 调色板提供器
 * @param {*} 生成调色板
 * @returns
 */
export function paletteProperty(source, key, append, tones) {
  const palette = CorePalette.of(source);
  return {
    rawPalette: {
      [key]: palette[append],
    },
    tones: tones,
  };
}

/**
 * 在DOM中设置调色板
 * @param {*} paletteProvider 调色板提供器
 */
export function setPaletteProperty(paletteProvider) {
  function updateVariables(variables) {
    var style = document.createElement("style");
    var cssVarsString = ":root {";
    for (var key in variables) {
      cssVarsString += `${key}: ${variables[key]};`;
    }
    cssVarsString += "}";
    style.innerHTML = cssVarsString;
    document.head.appendChild(style);
  }

  for (const [key, palette] of Object.entries(paletteProvider.rawPalette)) {
    var cssTokens = {};
    const paletteKey = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    for (const tone of paletteProvider.tones) {
      const token = `--md-ref-palette-${paletteKey}${tone}`;
      const color = hexFromArgb(palette.tone(tone));
      cssTokens[token] = color;
    }
    updateVariables(cssTokens);
  }
}

/**
 * 根据图片生成调色板
 * @param image 输入一张图片
 * @returns 返回一个完整的调色板
 */
export async function generateImagePalette(image) {
  const source = await sourceColorFromImage(image);
  return generateColorPalette(source);
}

/**
 * 根据颜色生成调色板
 * @param argbColor 输入一个 argb 颜色
 */
export async function generateColorPalette(argbColor) {
  const primaryTones = [10, 20, 30, 40, 80, 90, 100];
  setPaletteProperty(paletteProperty(argbColor, "primary", "a1", primaryTones));

  const secondaryTones = [10, 20, 30, 40, 80, 90, 100];
  setPaletteProperty(paletteProperty(argbColor, "secondary", "a2", secondaryTones));

  const tertiaryTones = [10, 20, 30, 40, 80, 90, 100];
  setPaletteProperty(paletteProperty(argbColor, "tertiary", "a3", tertiaryTones));

  const neutralTones = [0, 4, 6, 10, 12, 17, 20, 22, 24, 87, 90, 92, 94, 95, 96, 98, 100];
  setPaletteProperty(paletteProperty(argbColor, "neutral", "n1", neutralTones));

  const neutralVariantTones = [30, 50, 60, 80, 90];
  setPaletteProperty(paletteProperty(argbColor, "neutralVariant", "n2", neutralVariantTones));

  const errorTones = [10, 20, 30, 40, 80, 90, 100];
  setPaletteProperty(paletteProperty(argbColor, "error", "error", errorTones));
}
