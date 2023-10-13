import { hexFromArgb, argbFromHex, sourceColorFromImage, CorePalette } from "@material/material-color-utilities";

const themeImageProvider = new Image();
const cutsomThemeColor = document.body.getAttribute("color");
const themeRoot = document.querySelector(".JTM-Root");
const contentContainer = document.querySelector("#JTM-S-UniversalLayout-ContentFlow");
const contentPhotograph = document.querySelector("#JTM-S-Title-Impression img");
const contentNavigation = document.querySelector(".JTM-C-Navigation");
const contentNavigationDrawer = document.querySelector(".JTM-C-NavigationDrawer");
const contentDrawerEntries = contentNavigationDrawer ? contentNavigationDrawer.querySelectorAll(".JTM-C-NavigationDrawer-Entry") : [];
const contentDrawerMenuBtn = contentNavigationDrawer
  ? document.querySelectorAll("#JTM-C-Navigation-FAB > button, #JTM-C-AppBar-MenuIcon, #JTM-C-NavigationDrawer-MenuCloseIcon")
  : [];
const contentSplashScreen = document.querySelector(".JTM-S-LoadingSplash");
const currentPage = window.location.pathname;
const topAppBar = document.querySelector(".JTM-C-AppBar");
const modalTips = document.querySelector("#JTM-C-Dialog-ModalTips");
const modalTipsIcon = document.querySelectorAll("body > div.JTM-S-WebsiteInformation, #JTM-C-AppBar-InfoIcon");
const dialogBtnClose = document.querySelector("#dialog-close");
const scrollTopElements = document.querySelectorAll(".JTM-S-CornerFAB");
const rippleElements = document.querySelectorAll(
  `button, .JTM-C-Card[spec='clear'], .JTM-C-Card[spec='focus'], .JTM-C-NavigationDrawer a, #JTM-C-Navigation-DestinationAccent, .JTM-S-WebsiteInformation`
);
const websiteInfomation = document.querySelector(".JTM-S-WebsiteInformation");
const elementA = document.querySelectorAll("a");

const toggleJTM_C_NavigationDrawerSection = (show) => {
  contentNavigationDrawer.toggleAttribute("show", show);
  themeRoot.toggleAttribute("content-unfocused", show);
};

const addRippleEffect = (element) => {
  element.addEventListener("mousedown", (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    const d = Math.max(element.clientWidth, element.clientHeight);

    const rippleC = document.createElement("ripple-effect");
    element.appendChild(rippleC);

    rippleC.style.setProperty("--ripple-effect-x", x);
    rippleC.style.setProperty("--ripple-effect-y", y);
    rippleC.style.setProperty("--ripple-effect-d", d);

    setTimeout(() => {
      const rippleR = element.querySelector("ripple-effect");
      element.removeChild(rippleR);
    }, 400);
  });
};

const handleScroll = () => {
  const scrollY = contentContainer.scrollTop;
  const scrollThreshold = 64;
  topAppBar.setAttribute("scroll", scrollY >= scrollThreshold ? "true" : "false");
  themeRoot.setAttribute("hide-top-app-bar", scrollY >= 500 ? "true" : "false");
  scrollTopElements.forEach((element) => {
    element.style.cssText = `
      opacity: ${scrollY >= 400 ? "1" : "0"};
      visibility: ${scrollY >= 400 ? "visible" : "hidden"};
      animation: ${scrollY >= 400 ? "popOut var(--md-sys-motion-duration-long2) cubic-bezier(0.4, 1, 0.6, 0.6)" : ""}
    `;
  });
};

const handleResize = () => {
  contentNavigation.setAttribute("spec", window.innerWidth <= 768 ? "bar" : "rail");
};

const handleLinkDelayRedirection = (link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const delay = 240;
    setTimeout(() => {
      window.location.href = link.getAttribute("href");
    }, delay);
  });
};

const toggleDim = (isDim) => themeRoot.toggleAttribute("body-unfocused", isDim);

const openModal = () => {
  toggleDim(true);
  modalTips.style.animation = `JTM-C-Dialog-Show var(--md-sys-motion-duration-long1) var(--md-sys-motion-easing-emphasized) 1 normal both`;
  modalTips.showModal();
};

const closeModal = () => {
  toggleDim(false);
  modalTips.style.animation = `JTM-C-Dialog-Close var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized) 1 normal both`;
  setTimeout(() => {
    modalTips.close();
    modalTips.style.animation = "";
  }, 400);
};

const handleKeyboardEvent = (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    closeModal();
  }
};

const handleClickOutside = (event) => {
  if (event.target === modalTips) {
    closeModal();
  }
};

const initModal = () => {
  modalTipsIcon.forEach((element) => element.addEventListener("click", openModal));
  dialogBtnClose.addEventListener("click", closeModal);
  modalTips.addEventListener("keydown", handleKeyboardEvent);
  modalTips.addEventListener("click", handleClickOutside);
};

const removeLoadScreen = () => {
  contentSplashScreen.style.animation = "fadeOut 0.4s forwards";
  contentSplashScreen.addEventListener("animationend", () => {
    themeRoot.setAttribute("loaded", true);
  });
};

/**
 * 调色板提供器
 * @param {*} 生成primary调色板
 * @returns
 */
function primaryPalette(source) {
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
function secondaryPalette(source) {
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
function tertiaryPalette(source) {
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
function neutralPalette(source) {
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
function neutralVariantPalette(source) {
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
function errorPalette(source) {
  const palette = CorePalette.of(source);
  return {
    rawPalette: {
      error: palette.error,
    },
  };
}

/**
 * 在DOM中设置调色板
 * @param {*} toneName 一个色调值列表
 * @param {*} paletteProvider 调色板提供器
 */
function setPaletteProperty(toneName, paletteProvider) {
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
 * 根据图片生成调色板
 * @param image 输入一张图片
 * @returns 返回一个完整的调色板
 */
async function generateImagePalette(image) {
  const source = await sourceColorFromImage(image);
  return generateColorPalette(source);
}

/**
 * 根据颜色生成调色板
 * @param argbColor 输入一个 argb 颜色
 */
async function generateColorPalette(argbColor) {
  const primaryTones = [10, 20, 30, 40, 80, 90, 100];
  setPaletteProperty(primaryTones, primaryPalette(argbColor));

  const secondaryTones = [10, 20, 30, 40, 80, 90, 100];
  setPaletteProperty(secondaryTones, secondaryPalette(argbColor));

  const tertiaryTones = [10, 20, 30, 40, 80, 90, 100];
  setPaletteProperty(tertiaryTones, tertiaryPalette(argbColor));

  const neutralTones = [0, 6, 10, 12, 17, 20, 22, 90, 92, 94, 95, 96, 98];
  setPaletteProperty(neutralTones, neutralPalette(argbColor));

  const neutralVariantTones = [30, 50, 60, 80, 90];
  setPaletteProperty(neutralVariantTones, neutralVariantPalette(argbColor));

  const errorTones = [10, 20, 30, 40, 80, 90, 100];
  setPaletteProperty(errorTones, errorPalette(argbColor));
}

window.onpageshow = () => {
  contentNavigation.setAttribute("spec", window.innerWidth <= 768 ? "bar" : "rail");

  try {
    const activatedSegment = document.querySelector(`a[href="${currentPage}"]`);
    const inactiveSegment = activatedSegment.querySelector("#JTM-C-Navigation-SegmentInactive");
    inactiveSegment.id = "JTM-C-Navigation-SegmentActive";
  } catch (err) {
    document.querySelector(`a[href="/posts"] #JTM-C-Navigation-SegmentInactive`).id = "JTM-C-Navigation-SegmentActive";
  }

  scrollTopElements.forEach((element) => element.addEventListener("click", () => contentContainer.scrollTo({ top: 0 })));
  rippleElements.forEach(addRippleEffect);
  contentContainer.onscroll = handleScroll;
  window.onresize = handleResize;

  if (contentNavigationDrawer) {
    contentDrawerMenuBtn.forEach((element) => element.addEventListener("click", () => toggleJTM_C_NavigationDrawerSection()));
    contentDrawerEntries.forEach((element) => element.addEventListener("click", () => toggleJTM_C_NavigationDrawerSection(false)));
    document.addEventListener("click", (event) => {
      const isJTM_C_NavigationDrawer = event.target.closest(".JTM-C-NavigationDrawer");
      const isJTM_C_AppBar = event.target.closest(".JTM-C-AppBar");
      const isMAB = event.target.closest("#JTM-C-Navigation-FAB");
      if (!isJTM_C_NavigationDrawer && (window.matchMedia("(max-width: 768px)").matches ? !isJTM_C_AppBar : !isMAB)) {
        toggleJTM_C_NavigationDrawerSection(false);
      }
    });
  }

  initModal();

  if (websiteInfomation) {
    const websiteInfomationWidth = websiteInfomation.clientWidth;
    websiteInfomation.style.width = websiteInfomationWidth + "px";
  }

  elementA.forEach(handleLinkDelayRedirection);
};

window.onload = () => {
  removeLoadScreen();
  if (cutsomThemeColor) {
    generateColorPalette(argbFromHex(cutsomThemeColor));
  } else {
    themeImageProvider.src = contentPhotograph.src;
    generateImagePalette(themeImageProvider);
  }
};
