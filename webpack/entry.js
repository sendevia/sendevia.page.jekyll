import { hexFromArgb, argbFromHex, sourceColorFromImage, CorePalette } from "@material/material-color-utilities";

/**
 * 需要被取色的图片
 */
var themeImageProvider = new Image();
/**
 * 需要以此生成调色盘的hex颜色
 */
var cutsomThemeColor = document.body.getAttribute("color");
/**
 * 主题根节点
 */
var themeRoot = document.querySelector(".JTM-Root");
/**
 * 文章内容流
 */
var contentContainer = document.querySelector("#JTM-S-UniversalLayout-ContentFlow");
/**
 * 文章头部印象图
 */
var contentPhotograph = document.querySelector("#JTM-S-Title-Impression img");
/**
 * 页面导航
 */
var contentNavigation = document.querySelector(".JTM-C-Navigation");
/**
 * 展开的页面导航
 */
var contentNavigationDrawer = document.querySelector(".JTM-C-NavigationDrawer");
if (contentNavigationDrawer) {
  /**
   * Drawer目录元素
   */
  var contentDrawerEntries = contentNavigationDrawer.querySelectorAll(".JTM-C-NavigationDrawer-Entry");
  /**
   * 选择控制Drawer开关的元素
   */
  var contentDrawerMenuBtn = document.querySelectorAll("#JTM-C-Navigation-FAB > button, #JTM-C-AppBar-MenuIcon, #JTM-C-NavigationDrawer-MenuCloseIcon");
}
/**
 * 页面加载中的闪屏
 */
var contentSplashScreen = document.querySelector(".JTM-S-LoadingSplash");
/**
 * 定位当前所在的页面
 */
var currentPage = window.location.pathname;
/**
 * 选择移动端的标题栏
 */
var topAppBar = document.querySelector(".JTM-C-AppBar");
/**
 * 选择模态提示框
*/
var modalTips = document.querySelector("#JTM-C-Dialog-ModalTips");
/**
 * 选择可以开启模态提示框的元素
 */
var modalTipsIcon = document.querySelectorAll("body > div.JTM-S-WebsiteInformation, #JTM-C-AppBar-InfoIcon");
/**
 * 选择可以关闭模态提示框的元素
 */
var dialogBtnClose = document.querySelector("#dialog-close");
/**
 * 选择点击后跳转到页面顶端的元素
 */
var scrollTopElements = document.querySelectorAll(".JTM-S-CornerFAB");
/**
 * 选择需要涟漪效果的元素
 */
var rippleElements = document.querySelectorAll(
  `button,
  .JTM-C-Card a,
  .JTM-C-Card[spec='clear'],
  .JTM-C-Card[spec='focus'],
  .JTM-C-NavigationDrawer a,
  #JTM-C-Navigation-DestinationAccent,
  body > div.JTM-S-WebsiteInformation`
);
/**
 * 选择页面右上角的网站信息
 */
var websiteInfomation = document.querySelector("body > div.JTM-S-WebsiteInformation");

window.onpageshow = function () {
  // 进入后执行窗口宽度判断
  contentNavigation.setAttribute("spec", window.innerWidth <= 768 ? "bar" : "rail");

  // 页面指示
  try {
    let activatedSegment = document.querySelector(`a[href="${currentPage}"]`);
    let inactiveSegment = activatedSegment.querySelector("#JTM-C-Navigation-SegmentInactive");
    inactiveSegment.id = "JTM-C-Navigation-SegmentActive";
  } catch (err) {
    document.querySelector(`a[href="/posts"] #JTM-C-Navigation-SegmentInactive`).id = "JTM-C-Navigation-SegmentActive";
  }

  // 滚动到页面顶部
  scrollTopElements.forEach((i) => {
    i.addEventListener("click", () => {
      contentContainer.scrollTo({
        top: 0,
      });
    });
  });

  // 涟漪效果
  rippleElements.forEach((i) => {
    i.addEventListener("mousedown", (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      const d = Math.max(i.clientWidth, i.clientHeight);

      var rippleC = document.createElement("ripple-effect");
      i.appendChild(rippleC);

      rippleC.style.setProperty("--ripple-effect-x", x);
      rippleC.style.setProperty("--ripple-effect-y", y);
      rippleC.style.setProperty("--ripple-effect-d", d);

      setTimeout(() => {
        var rippleR = i.querySelector("ripple-effect");
        i.removeChild(rippleR);
      }, 400);
    });
  });

  // 滚动事件
  let lastScrollY = 0;
  contentContainer.onscroll = function () {
    let scrollY = this.scrollTop;

    topAppBar.setAttribute("scroll", scrollY >= 64 ? "true" : "false");
    themeRoot.setAttribute("hide-top-app-bar", scrollY >= 500 ? "true" : "false");
    scrollTopElements.forEach((i) => {
      i.style.cssText = `
      opacity: ${scrollY >= 400 ? "1" : "0"};
      visibility: ${scrollY >= 400 ? "visible" : "hidden"};
      animation: ${scrollY >= 400 ? "popOut var(--md-sys-motion-duration-long2) cubic-bezier(0.4, 1, 0.6, 0.6)" : ""}
      `;
    });

    if (scrollY < lastScrollY) {
      themeRoot.setAttribute("hide-top-app-bar", "false");
    }

    lastScrollY = scrollY <= 0 ? 0 : scrollY;
  };

  // 缩放事件
  window.onresize = function () {
    contentNavigation.setAttribute("spec", window.innerWidth <= 768 ? "bar" : "rail");
  };

  // 侧边栏
  if (contentNavigationDrawer) {
    const toggleJTM_C_NavigationDrawerSection = (boolean) => {
      contentNavigationDrawer.toggleAttribute("show", boolean);
      themeRoot.toggleAttribute("content-unfocused", boolean);
    };

    contentDrawerMenuBtn.forEach((i) => {
      i.addEventListener("click", () => {
        toggleJTM_C_NavigationDrawerSection();
      });
    });

    contentDrawerEntries.forEach((i) => {
      i.addEventListener("click", () => {
        toggleJTM_C_NavigationDrawerSection(false);
      });
    });

    document.addEventListener("click", (i) => {
      let isJTM_C_NavigationDrawer = i.target.closest(".JTM-C-NavigationDrawer");
      let isJTM_C_AppBar = i.target.closest(".JTM-C-AppBar");
      let isMAB = i.target.closest("#JTM-C-Navigation-FAB");

      if (!isJTM_C_NavigationDrawer && (window.matchMedia("(max-width: 768px)").matches ? !isJTM_C_AppBar : !isMAB)) {
        toggleJTM_C_NavigationDrawerSection(false);
      }
    });
  }

  // 模态tips
  const toggleDim = (isDim) => themeRoot.toggleAttribute("body-unfocused", isDim);
  modalTipsIcon.forEach((i) => {
    i.addEventListener("click", () => {
      toggleDim(true);
      modalTips.style.animation = `JTM-C-Dialog-Show var(--md-sys-motion-duration-long1) var(--md-sys-motion-easing-emphasized) 1 normal both`;
      modalTips.showModal();
      isModalShowing = true;
    });
  });
  let isModalShowing = false;
  const closeModal = () => {
    toggleDim(false);
    isModalShowing = true;
    modalTips.style.animation = `JTM-C-Dialog-Close var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized) 1 normal both`;
    setTimeout(() => {
      if (isModalShowing) {
        modalTips.close();
        modalTips.style.animation = "";
        isModalShowing = false;
      }
    }, 400);
  };
  dialogBtnClose.addEventListener("click", closeModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isModalShowing) {
      closeModal();
    }
  });

  // 桌面端右上角页面信息按钮
  if (websiteInfomation) {
    var websiteInfomationWidth = websiteInfomation.clientWidth;
    websiteInfomation.style.width = websiteInfomationWidth + "px";
  }
};

window.onload = function () {
  removeLoadScreen();

  if (cutsomThemeColor) {
    generateColorPalette(argbFromHex(cutsomThemeColor));
  } else {
    themeImageProvider.src = contentPhotograph.src;
    generateImagePalette(themeImageProvider);
  }
};

/**
 * 移除加载屏幕
 */
function removeLoadScreen() {
  contentSplashScreen.style.animation = "fadeOut 0.4s forwards";

  contentSplashScreen.addEventListener("animationend", () => {
    themeRoot.setAttribute("loaded", true);
  });
}

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
