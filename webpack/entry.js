import { hexFromArgb, argbFromHex, themeFromImage, themeFromSourceColor } from "@material/material-color-utilities";

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
var themeRoot = document.querySelector(".material-theme");
/**
 * 文章内容主容器
 */
var contentContainer = document.querySelector(".content-container");
/**
 * 文章头部印象图
 */
var contentPhotograph = document.querySelector(".impression img");
/**
 * 页面导航
 */
var contentNavigation = document.querySelector(".mng");
/**
 * 展开的页面导航
 */
var contentNavigationDrawer = document.querySelector(".mnd");
if (contentNavigationDrawer) {
  /**
   * Drawer目录元素
   */
  var contentDrawerEntries = contentNavigationDrawer.querySelectorAll(".mnd-entry");
  /**
   * 控制Drawer开关的元素
   */
  var contentDrawerMenuBtn = document.querySelectorAll("#maf-mfb-menu, #mtb-mib-menu");
}
/**
 * 页面加载中的闪屏
 */
var contentSplashScreen = document.querySelector(".content-loading");
/**
 * 定位当前所在的页面
 */
var currentPage = window.location.pathname;
/**
 * 选择移动端的标题栏
 */
var topAppBar = document.querySelector(".mtb");
/**
 * 选择全部的开启模态提示框的元素
 */
var modalTipsIcon = document.querySelectorAll("#mtb-mib-info, #website-information-mib");
/**
 * 选择模态提示框
 */
var modalTips = document.querySelector("#mdl-tips");
/**
 * 选择关闭模态提示框的元素
 */
var dialogBtnClose = document.querySelector("#dialog-close");
/**
 * 选择点击后跳转到页面顶端的元素
 */
var scrollTopElements = document.querySelectorAll("#right-corner-fab");
/**
 * 选择全部需要涟漪效果的元素
 */
var rippleElements = document.querySelectorAll(
  `button,
  .mcd a,
  .mcd[spec='clear'],
  .mcd[spec='focus'],
  .mnd a,
  #accent`
);
/**
 * 选择全部需要控制状态的面包屑元素
 */
var mcpInputElements = document.querySelectorAll("label.mcp > input[type='checkbox']");

window.onpageshow = function () {
  // 进入后执行窗口宽度判断
  contentNavigation.setAttribute("spec", window.innerWidth <= 768 ? "bar" : "rail");

  // 页面指示
  try {
    let activatedSegment = document.querySelector(`a[href="${currentPage}"]`);
    let inactiveSegment = activatedSegment.querySelector("#segment-inactive");
    inactiveSegment.id = "segment-active";
  } catch (err) {
    document.querySelector(`a[href="/posts"] #segment-inactive`).id = "segment-active";
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
      animation: ${scrollY >= 400 ? "popOut 0.5s cubic-bezier(0.4, 1, 0.6, 0.6)" : ""}
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
    const toggleMndSection = (boolean) => {
      contentNavigationDrawer.toggleAttribute("show", boolean);
      themeRoot.toggleAttribute("content-unfocused", boolean);
    };

    contentDrawerMenuBtn.forEach((i) => {
      i.addEventListener("click", () => {
        toggleMndSection();
      });
    });

    contentDrawerEntries.forEach((i) => {
      i.addEventListener("click", () => {
        toggleMndSection(false);
      });
    });

    document.addEventListener("click", (i) => {
      let isMnd = i.target.closest(".mnd");
      let isMtb = i.target.closest(".mtb");
      let isMAB = i.target.closest("#mng-rail-fab");

      if (!isMnd && (window.matchMedia("(max-width: 768px)").matches ? !isMtb : !isMAB)) {
        toggleMndSection(false);
      }
    });
  }

  // 模态tips
  const toggleDim = (isDim) => themeRoot.toggleAttribute("body-unfocused", isDim);

  modalTipsIcon.forEach((i) => {
    i.addEventListener("click", () => {
      toggleDim(true);
      modalTips.style.animation = `mdl-show var(--md-sys-motion-duration-long1) var(--md-sys-motion-easing-emphasized) 1 normal both`;
      modalTips.showModal();
      isModalShowing = true;
    });
  });

  let isModalShowing = false;

  const closeModal = () => {
    toggleDim(false);
    isModalShowing = true;
    modalTips.style.animation = `mdl-close var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized) 1 normal both`;
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

  // mcp input 展示状态切换
  mcpInputElements.forEach((input) => {
    const checkSymbol = document.createElement("span");
    checkSymbol.innerHTML = "check";

    function updateLabel() {
      if (input.checked) {
        input.parentElement.setAttribute("checked", "");
        input.parentElement.appendChild(checkSymbol);
      } else {
        input.parentElement.removeAttribute("checked");
        if (checkSymbol.parentNode) {
          input.parentElement.removeChild(checkSymbol);
        }
      }
    }
    updateLabel();
    input.addEventListener("change", updateLabel);
  });
};

window.onload = function () {
  removeLoadScreen();

  themeImageProvider.src = contentPhotograph.src;

  if (cutsomThemeColor) {
    generateM3Palette(themeFromSourceColor(argbFromHex(cutsomThemeColor)));
  } else {
    themeFromImage(themeImageProvider).then(function (result) {
      generateM3Palette(result);
    });
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
 * @param theme 一个 theme 对象
 */
function generateM3Palette(theme) {
  const tones = [0, 4, 6, 10, 12, 17, 20, 22, 24, 30, 40, 50, 60, 80, 87, 90, 92, 94, 95, 96, 98, 99, 100];

  for (const [key, palette] of Object.entries(theme.palettes)) {
    const paletteKey = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    for (const tone of tones) {
      const token = `--md-ref-palette-${paletteKey}${tone}`;
      const color = hexFromArgb(palette.tone(tone));
      themeRoot.style.setProperty(token, color);
    }
  }
}
