import { applyTheme, argbFromHex, themeFromImage, themeFromSourceColor } from "@material/material-color-utilities";
import "simple-jekyll-search";

const img = new Image();
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

window.onpageshow = function () {
  // 常用常量设置
  const contentContainer = document.querySelector(".content-container");
  const contentHeader = document.querySelector("#content-header");
  const contentNavigation = document.querySelector(".mng");
  const contentTips = document.querySelector("#content-tips");
  const currentPage = window.location.pathname;
  const progressElement = document.querySelector("#reading-progress");
  const scrollTop = document.documentElement.scrollTop || scrollY;
  const scrollTopElement = document.querySelector("#rcf-mfb-topbutton");
  const topAppBar = document.querySelector(".mtb");

  contentNavigation.setAttribute("spec", window.innerWidth <= 768 ? "bar" : "rail");

  // 页面指示
  try {
    const activatedSegment = document.querySelector(`a[href="${currentPage}"]`);
    const inactiveSegment = activatedSegment.querySelector("#segment-inactive");
    inactiveSegment.id = "segment-active";
  } catch (error) {
    document.querySelector(`a[href="/posts.html"] #segment-inactive`).id = "segment-active";
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
      btn.style.setProperty("--x", x);
      btn.style.setProperty("--y", y);
      btn.style.setProperty("--d", d);
    });
    btn.addEventListener("animationend", () => {
      btn.classList.remove("ripple-effect");
    });
  });

  // 滚动事件
  contentContainer.onscroll = function () {
    const clientHeight = this.clientHeight;
    const scrollHeight = this.scrollHeight;
    const scrollY = this.scrollTop;

    topAppBar.setAttribute("scroll", scrollY >= 64 ? "true" : "false");

    contentHeader.style.opacity = scrollY >= 400 ? "0" : "1";
    scrollTopElement.style.cssText = `
      opacity: ${scrollY >= 400 ? "1" : "0"};
      visibility: ${scrollY >= 400 ? "visible" : "hidden"};
      animation: ${scrollY >= 400 ? "popOut 0.6s cubic-bezier(0.4, 1, 0.6, 0.6)" : ""}
    `;

    // 阅读进度
    // if (contentTips) {
    //   const readPercent = (scrollTop / (scrollHeight - clientHeight)).toFixed(2) * 100;
    //   progressElement.style.width = readPercent + "%";
    // }
  };

  // 缩放事件
  window.onresize = function () {
    changeHeaderTransform();

    contentNavigation.setAttribute("spec", window.innerWidth <= 768 ? "bar" : "rail");
  };

  // 侧边栏
  const mndSection = document.querySelector(".mnd");
  const mndEntries = mndSection.querySelectorAll(".mnd-entry");
  const mnbMenuBtn = document.querySelectorAll(".menu-and-fab > .mib, .mtb > #mtb-mib-menu");

  const toggleMndSection = (boolean) => {
    mndSection.toggleAttribute("show", boolean);
    contentContainer.toggleAttribute("compress", boolean);
  };

  mnbMenuBtn.forEach((i) => {
    i.addEventListener("click", () => {
      toggleMndSection();
    });
  });

  mndEntries.forEach((i) => {
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
};

window.onload = function () {
  removeLoadScreen();
  changeHeaderTransform();

  img.src = document.querySelector("#header_image").src;
  const cutsomThemeColor = document.body.getAttribute("color");

  if (cutsomThemeColor) {
    let theme = themeFromSourceColor(argbFromHex(cutsomThemeColor));
    applyTheme(theme, { target: document.body, dark: mediaQuery.matches });
  } else {
    let theme = themeFromImage(img);
    theme.then(function (result) {
      applyTheme(result, { target: document.body, dark: mediaQuery.matches });
    });
  }

  // 监听颜色主题更改
  mediaQuery.addEventListener("change", () => {
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

const headerEl = document.querySelector("#content-header");
const resizeObserverHeader = new ResizeObserver(() => {
  changeHeaderTransform();
});
resizeObserverHeader.observe(headerEl);

function changeHeaderTransform() {
  const isImageSource = document.querySelector("#header_image");
  const isContainerOffset = headerEl.offsetHeight;
  const isImageOffset = isImageSource.offsetHeight;

  isImageSource.style.setProperty("--via-transform-header-image", Math.abs(isImageOffset - isContainerOffset));
}

function removeLoadScreen() {
  const splashScreen = document.querySelector(".content-loading");
  const mainContent = document.querySelector(".content-container");
  const headeImage = document.querySelector("#header_image");

  splashScreen.style.animation = "fadeOut 0.4s forwards";
  headeImage.style.animation = "headerImageTransform 120s cubic-bezier(0.5, 0.05, 0.5, 0.95) infinite";

  splashScreen.addEventListener("animationend", () => {
    splashScreen.style.display = "none";
    mainContent.style.overflow = "overlay";
  });
}
