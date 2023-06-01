import { applyTheme, argbFromHex, themeFromImage, themeFromSourceColor } from "@material/material-color-utilities";
import "simple-jekyll-search";

// 常用常量设置
const themeImageProvider = new Image();
const mediaQueryPerferScheme = window.matchMedia("(prefers-color-scheme: dark)");
const cutsomThemeColor = document.body.getAttribute("color");
const contentContainer = document.querySelector(".content-container");
const contentHeader = document.querySelector("#content-header");
const contentHeaderImage = document.querySelector("#header_image");
const contentNavigation = document.querySelector(".mng");
const contentDrawer = document.querySelector(".mnd");
const contentDrawerEntries = contentDrawer.querySelectorAll(".mnd-entry");
const contentDrawerMenuBtn = document.querySelectorAll("#maf-mib-menu, #mtb-mib-menu");
const contentSplashScreen = document.querySelector(".content-loading");
const currentPage = window.location.pathname;
const progressElement = document.querySelector("#reading-progress");
const scrollTop = document.documentElement.scrollTop || scrollY;
const scrollTopElement = document.querySelector("#rcf-mfb-topbutton");
const topAppBar = document.querySelector(".mtb");
const mobileTipsIcon = document.querySelector("#mtb-mib-info");
const mobileTipsModal = document.querySelector("#mdl-tips");

window.onpageshow = function () {
  contentNavigation.setAttribute("spec", window.innerWidth <= 768 ? "bar" : "rail");

  // 页面指示
  try {
    const activatedSegment = document.querySelector(`a[href="${currentPage}"]`);
    const inactiveSegment = activatedSegment.querySelector("#segment-inactive");
    inactiveSegment.id = "segment-active";
  } catch (error) {
    document.querySelector(`a[href="/posts"] #segment-inactive`).id = "segment-active";
  }

  // 滚动到页面顶部
  function scrollToTop() {
    contentContainer.scrollTo({
      top: 0,
    });
  }

  scrollTopElement.addEventListener("click", () => {
    scrollToTop();
  });

  // 涟漪效果
  const rippleElements = document.querySelectorAll(
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
    button,
    input[type='checkbox'],
    input[type='radio']`
  );

  rippleElements.forEach((btn) => {
    btn.addEventListener("mousedown", (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      const d = Math.max(btn.clientWidth, btn.clientHeight);

      btn.classList.add("ripple-effect");
      btn.style.setProperty("--ripple-effect-x", x);
      btn.style.setProperty("--ripple-effect-y", y);
      btn.style.setProperty("--ripple-effect-d", d);
    });
    btn.addEventListener("animationend", () => {
      btn.classList.remove("ripple-effect");
    });
  });

  // 滚动事件
  var lastScrollY = 0;
  contentContainer.onscroll = function () {
    const scrollY = this.scrollTop;

    topAppBar.setAttribute("scroll", scrollY >= 64 ? "true" : "false");
    topAppBar.setAttribute("hidden", scrollY >= 500 ? "true" : "false");
    contentHeader.style.opacity = scrollY >= 400 ? "0" : "1";
    scrollTopElement.style.cssText = `
      opacity: ${scrollY >= 400 ? "1" : "0"};
      visibility: ${scrollY >= 400 ? "visible" : "hidden"};
      animation: ${scrollY >= 400 ? "popOut 0.6s cubic-bezier(0.4, 1, 0.6, 0.6)" : ""}
    `;

    if (scrollY < lastScrollY) {
      topAppBar.removeAttribute("hidden");
    }

    lastScrollY = scrollY <= 0 ? 0 : scrollY;
  };

  // 缩放事件
  window.onresize = function () {
    changeHeaderTransform();

    contentNavigation.setAttribute("spec", window.innerWidth <= 768 ? "bar" : "rail");
  };

  // 侧边栏
  const toggleMndSection = (boolean) => {
    contentDrawer.toggleAttribute("show", boolean);
    contentContainer.toggleAttribute("compress", boolean);
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

  document.addEventListener("click", (e) => {
    const isMnd = e.target.closest(".mnd");
    const isMtb = e.target.closest(".mtb");
    const isMAB = e.target.closest(".menu-and-fab");

    if (!isMnd && (window.matchMedia("(max-width: 768px)").matches ? !isMtb : !isMAB)) {
      toggleMndSection(false);
    }
  });

  // 展示模态tips
  mobileTipsIcon.addEventListener("click", () => {
    mobileTipsModal.showModal();
  });
};

window.onload = function () {
  removeLoadScreen();
  changeHeaderTransform();

  themeImageProvider.src = contentHeaderImage.src;

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
  const isContainerOffset = contentHeader.offsetHeight;
  const isImageOffset = contentHeaderImage.offsetHeight;

  contentHeaderImage.style.setProperty("--via-transform-header-image", Math.abs(isImageOffset - isContainerOffset));
}

// 移除加载屏幕
function removeLoadScreen() {
  contentSplashScreen.style.animation = "fadeOut 0.4s forwards";
  contentHeaderImage.style.animation = "headerImageTransform 120s cubic-bezier(0.5, 0.05, 0.5, 0.95) infinite";

  contentSplashScreen.addEventListener("animationend", () => {
    contentSplashScreen.style.display = "none";
    contentContainer.style.overflow = "overlay";
  });
}
