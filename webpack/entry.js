import "simple-jekyll-search";
import { applyTheme, argbFromHex, themeFromImage, themeFromSourceColor } from "@material/material-color-utilities";

// 常用常量设置
var themeImageProvider = new Image();
var mediaQueryPerferScheme = window.matchMedia("(prefers-color-scheme: dark)");
var cutsomThemeColor = document.body.getAttribute("color");
var themeRoot = document.querySelector(".material-theme");
var contentContainer = document.querySelector(".content-container");
var contentHeader = document.querySelector("#content-header");
var contentPhotograph = document.querySelector("#impression");
var contentNavigation = document.querySelector(".mng");
var contentNavigationDrawer = document.querySelector(".mnd");
if (contentNavigationDrawer) {
  var contentDrawerEntries = contentNavigationDrawer.querySelectorAll(".mnd-entry");
  var contentDrawerMenuBtn = document.querySelectorAll("#maf-mfb-menu, #mtb-mib-menu");
}
var contentSplashScreen = document.querySelector(".content-loading");
var currentPage = window.location.pathname;
var topAppBar = document.querySelector(".mtb");
var modalTipsIcon = document.querySelectorAll("#mtb-mib-info, #maf-mib-modaltips");
var modalTips = document.querySelector("#mdl-tips");
var dialogBtnClose = document.querySelector("#dialog-close");
var scrollTopElements = document.querySelectorAll(`#rcf-mfb-topbutton`);
var rippleElements = document.querySelectorAll(
  `.mbt,
  .mcd a,
  .mcd-header > span,
  .mcd[spec='clear'],
  .mcd[spec='focus'],
  .mcp,
  .menu-and-fab span,
  .mfb,
  .mib,
  .mnd a,
  #accent,
  button`
);

// worker.postMessage({
// cutsomThemeColor: document.body.getAttribute("color"),
// });

// worker.onmessage = ({ data: { themeObject } }) => {
//   const theme = themeObject;
//   console.log(theme);
//   // applyTheme(theme, { target: document.body, dark: mediaQueryPerferScheme.matches });
// };

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
    contentHeader.style.opacity = scrollY >= 400 ? "0" : "1";
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
    changeHeaderTransform();

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
      let isMAB = i.target.closest(".menu-and-fab");

      if (!isMnd && (window.matchMedia("(max-width: 768px)").matches ? !isMtb : !isMAB)) {
        toggleMndSection(false);
      }
    });
  }

  // 模态tips
  const toggleDim = (boolean) => {
    themeRoot.toggleAttribute("body-unfocused", boolean);
  };

  modalTipsIcon.forEach((i) => {
    i.addEventListener("click", () => {
      toggleDim(true);
      modalTips.style.animation = "mdl-show var(--md-sys-motion-duration-long1) var(--md-sys-motion-easing-emphasized) 1 normal both";
      modalTips.showModal();
    });
  });

  var isModalShowing = false;
  dialogBtnClose.addEventListener("click", () => {
    toggleDim();
    isModalShowing = true;
    modalTips.style.animation = "mdl-close var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized) 1 normal both";
    modalTips.onanimationend = function () {
      if (isModalShowing) {
        this.close();
        this.style.animation = "";
        isModalShowing = false;
      }
    };
  });
};

window.onload = function () {
  removeLoadScreen();
  changeHeaderTransform();

  themeImageProvider.src = contentPhotograph.src;

  if (cutsomThemeColor) {
    let theme = themeFromSourceColor(argbFromHex(cutsomThemeColor));
    applyTheme(theme, { target: document.body, dark: mediaQueryPerferScheme.matches });
  } else {
    let theme = themeFromImage(themeImageProvider);
    theme.then(function (result) {
      applyTheme(result, { target: document.body, dark: mediaQueryPerferScheme.matches });
    });
  }

  // 监听颜色主题更改
  mediaQueryPerferScheme.addEventListener("change", () => {
    location.reload();
  });

  // sjs插件配置
  if (window.location.pathname == "/posts") {
    window.sjs = new SimpleJekyllSearch({
      fuzzy: false,
      json: "/search.json",
      noResultsText: "＞︿＜ 无结果",
      resultsContainer: document.getElementById("results-container"),
      searchInput: document.getElementById("search-input"),
      searchResultTemplate: '<a href="{url}"><button spec="text">{title}</button></a>',
    });
  }
};

// 监听大标题的大小更改
const headerResizeObserver = new ResizeObserver(() => {
  changeHeaderTransform();
});
headerResizeObserver.observe(contentHeader);

// 更新标题背景图片的位移
function changeHeaderTransform() {
  const isContainerOffset = contentHeader.offsetHeight + 10;
  const isImageOffset = contentPhotograph.offsetHeight;

  contentPhotograph.style.setProperty("--via-transform-header-image", Math.abs(isImageOffset - isContainerOffset));
}

// 移除加载屏幕
function removeLoadScreen() {
  contentSplashScreen.style.animation = "fadeOut 0.4s forwards";
  contentPhotograph.style.animation = "PhotographTransform 120s cubic-bezier(0.5, 0.05, 0.5, 0.95) infinite";

  contentSplashScreen.addEventListener("animationend", () => {
    themeRoot.setAttribute("loaded", true);
  });
}
