import { CorePalette, hexFromArgb, sourceColorFromImage } from "@material/material-color-utilities";
import { themeRoot } from "../app";

/**
 * 在DOM中设置调色板
 * @param {*} toneName 一个色调值列表
 * @param {*} paletteProvider 调色板提供器
 */
export function setPaletteProperty(toneName, paletteProvider) {
  for (const [key, palette] of Object.entries(paletteProvider.rawPalette)) {
    const paletteKey = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    for (const tone of toneName) {
      const token = `--md-ref-palette-${paletteKey}${tone}`;
      const color = hexFromArgb(palette.tone(tone));
      themeRoot.style.setProperty(token, color);
    }
  }
}
/**
 * 调色板提供器
 * @param {*} 生成primary调色板
 * @returns
 */
export function primaryPalette(source) {
  const palette = CorePalette.of(source);
  return {
    rawPalette: {
      primary: palette.a1,
    },
  };
}
/**
 * 调色板提供器
 * @param {*} 生成secondary调色板
 * @returns
 */
export function secondaryPalette(source) {
  const palette = CorePalette.of(source);
  return {
    rawPalette: {
      secondary: palette.a2,
    },
  };
}
/**
 * 调色板提供器
 * @param {*} 生成tertiary调色板
 * @returns
 */
export function tertiaryPalette(source) {
  const palette = CorePalette.of(source);
  return {
    rawPalette: {
      tertiary: palette.a3,
    },
  };
}
/**
 * 调色板提供器
 * @param {*} 生成neutral调色板
 * @returns
 */
export function neutralPalette(source) {
  const palette = CorePalette.of(source);
  return {
    rawPalette: {
      neutral: palette.n1,
    },
  };
}
/**
 * 调色板提供器
 * @param {*} 生成neutralVariant调色板
 * @returns
 */
export function neutralVariantPalette(source) {
  const palette = CorePalette.of(source);
  return {
    rawPalette: {
      neutralVariant: palette.n2,
    },
  };
}
/**
 * 调色板提供器
 * @param {*} 生成error调色板
 * @returns
 */
export function errorPalette(source) {
  const palette = CorePalette.of(source);
  return {
    rawPalette: {
      error: palette.error,
    },
  };
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
  setPaletteProperty(primaryTones, primaryPalette(argbColor));

  const secondaryTones = [10, 20, 30, 40, 80, 90, 100];
  setPaletteProperty(secondaryTones, secondaryPalette(argbColor));

  const tertiaryTones = [10, 20, 30, 40, 80, 90, 100];
  setPaletteProperty(tertiaryTones, tertiaryPalette(argbColor));

  const neutralTones = [0, 6, 10, 12, 17, 20, 22, 87, 90, 92, 94, 95, 96, 98, 100];
  setPaletteProperty(neutralTones, neutralPalette(argbColor));

  const neutralVariantTones = [30, 50, 60, 80, 90];
  setPaletteProperty(neutralVariantTones, neutralVariantPalette(argbColor));

  const errorTones = [10, 20, 30, 40, 80, 90, 100];
  setPaletteProperty(errorTones, errorPalette(argbColor));
}
