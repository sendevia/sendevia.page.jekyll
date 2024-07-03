import { CorePalette, hexFromArgb, Blend, argbFromHex } from "@material/material-color-utilities";

/**
 * 调色板提供器
 * @param {number} argbColor 颜色来源
 * @param {string} name token的后缀
 * @param {"a1/a2/a3/n1/n2/error"} append 调色板的类型
 * @param {[]} tones 调色板的色相
 * @return CorePalette Object
 */
function paletteProperty(argbColor, name, append, tones) {
  const palette = CorePalette.of(argbColor);
  return {
    rawPalette: {
      [name]: palette[append],
    },
    tones: tones,
  };
}

/**
 * 设置调色板
 * @param {Object} paletteProvider - 一个 palette object
 */
function setPalette(paletteProvider) {
  const cssVars = Object.entries(paletteProvider.rawPalette).reduce((cssTokens, [key, palette]) => {
    const paletteKey = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    paletteProvider.tones.forEach((tone) => {
      const varName = `--md-ref-palette-${paletteKey}${tone}`;
      cssTokens[varName] = hexFromArgb(palette.tone(tone));
    });
    return cssTokens;
  }, {});

  const styleElement = document.createElement("style");
  styleElement.innerHTML = `:root { ${Object.entries(cssVars)
    .map(([varName, color]) => `${varName}: ${color};`)
    .join("")} }`;
  document.head.appendChild(styleElement);
}

/**
 * 根据颜色生成调色板
 * @param {number} baseColor - 输入一个 argb 颜色
 */
export async function generateColorPalette(baseColor) {
  const palettes = [
    { name: "error", append: "error", tones: [10, 20, 30, 40, 80, 90, 100] },
    { name: "neutralVariant", append: "n2", tones: [30, 50, 60, 80, 90] },
    { name: "neutral", append: "n1", tones: [0, 4, 6, 10, 12, 17, 20, 22, 24, 87, 90, 92, 94, 95, 96, 98, 100] },
    { name: "tertiary", append: "a3", tones: [10, 20, 30, 40, 80, 90, 100] },
    { name: "secondary", append: "a2", tones: [10, 20, 30, 40, 48, 80, 90, 100] },
    { name: "primary", append: "a1", tones: [10, 20, 30, 40, 80, 90, 100] },
  ];

  const harmonizedPalettes = [
    { color: "#c08eaf", name: "purple", append: "a1", tones: [10, 20, 30, 40, 80, 90, 95] },
    { color: "#f9d770", name: "yellow", append: "a1", tones: [10, 20, 30, 40, 80, 90, 95] },
    { color: "#68b88e", name: "green", append: "a1", tones: [10, 20, 30, 40, 80, 90, 95] },
    { color: "#5cb3cc", name: "blue", append: "a1", tones: [10, 20, 30, 40, 80, 90, 95] },
    { color: "#c27c88", name: "red", append: "a1", tones: [10, 20, 30, 40, 80, 90, 95] },
  ];

  for (const palette of palettes) {
    const paletteObject = paletteProperty(baseColor, palette.name, palette.append, palette.tones);
    setPalette(paletteObject);
  }

  for (const palette of harmonizedPalettes) {
    const paletteObject = paletteProperty(Blend.harmonize(argbFromHex(palette.color), baseColor), palette.name, palette.append, palette.tones);
    setPalette(paletteObject);
  }
}
