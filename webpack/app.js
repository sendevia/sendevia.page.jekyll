import { argbFromHex } from "@material/material-color-utilities";
import { generateColorPalette } from "./monet";
import "simple-jekyll-search/dest/simple-jekyll-search.min.js";

import "@material/web/button/filled-button";
import "@material/web/button/filled-tonal-button";
import "@material/web/button/text-button";
import "@material/web/chips/assist-chip";
import "@material/web/chips/chip-set";
import "@material/web/dialog/dialog";
import "@material/web/icon/icon";
import "@material/web/iconbutton/filled-icon-button";
import "@material/web/iconbutton/icon-button";
import "@material/web/progress/linear-progress";
import "@material/web/ripple/ripple";

const CONFIG = {
  BREAKPOINTS: {
    LARGE: 1600,
    EXPANDED: 1200,
    MEDIUM: 840,
    COMPACT: 600,
  },
  TIMING: {
    REDIRECT_DELAY: 240,
    LOADING_DELAY: 1500,
    SNACKBAR_DURATION: 3000,
  },
  SELECTORS: {
    THEME_ROOT: ".theme-root",
    ROOT_FEED: ".main-layout[spec='feed'] #main-layout-content-filler",
    ROOT_NAVIGATION: ".navigation",
    ROOT_CONTENT: "#main-layout-content-flow",
    PAGE_CURRENT: window.location.pathname,
    LOADING_SPLASH: ".loading-splash",
    MWC_DIALOG: "md-dialog",
    MWC_DIALOG_BUTTON_OPEN: "#default-header-webinfo, #appbar-InfoIcon",
    MWC_DIALOG_BUTTON_CLOSE: "md-dialog div[slot='actions'] md-text-button",
    SCROLL_BUTTON: "#main-layout-scrolltop",
    COPY_BUTTON: ".blockcopy",
    DELAY_REDIRECT:
      "#navigation-drawer-backward, .main-layout-search-result-item, #main-layout-content-filler .card a, #navigation-destinations a, .p-posts-timeline-post-card a, .main-layout-quicklinks, .p-pixivgallery a",
    COLOR_HEX: "color",
    MOBILE_APPBAR: ".appbar",
    DRAWER: "#navigation-drawer",
    DRAWER_H1: "details summary > a",
    DRAWER_H2: "details > a",
    NAVIGATION_CONTROLLER: "#navigation-destinations > div",
    NAVIGATION_CONTROLLER_BUTTON: "#appbar-menu, #navigation-drawer-close",
    ARTICAL_ANCHOR: "#main-layout-content-filler section:nth-child(1) h1",
    ARTICAL_BULLET: "ul li",
  },
};

const DOM = {
  THEME: {
    ROOT: document.querySelector(CONFIG.SELECTORS.THEME_ROOT),
    ROOT_FEED: document.querySelector(CONFIG.SELECTORS.ROOT_FEED),
    PAGE_CURRENT: CONFIG.SELECTORS.PAGE_CURRENT,
    LOADING_SPLASH: document.querySelector(CONFIG.SELECTORS.LOADING_SPLASH),
    MWC_DIALOG: document.querySelector(CONFIG.SELECTORS.MWC_DIALOG),
    MWC_DIALOG_BUTTON_OPEN: document.querySelectorAll(CONFIG.SELECTORS.MWC_DIALOG_BUTTON_OPEN),
    MWC_DIALOG_BUTTON_CLOSE: document.querySelector(CONFIG.SELECTORS.MWC_DIALOG_BUTTON_CLOSE),
    SCROLL_BUTTON: document.querySelectorAll(CONFIG.SELECTORS.SCROLL_BUTTON),
    COPY_BUTTON: document.querySelectorAll(CONFIG.SELECTORS.COPY_BUTTON),
    DELAY_REDIRECT: document.querySelectorAll(CONFIG.SELECTORS.DELAY_REDIRECT),
    COLOR_HEX: document.body.getAttribute(CONFIG.SELECTORS.COLOR_HEX),
    MOBILE_APPBAR: document.querySelector(CONFIG.SELECTORS.MOBILE_APPBAR),
  },
  NAVIGATION: {
    ROOT: document.querySelector(CONFIG.SELECTORS.ROOT_NAVIGATION),
    DRAWER: document.querySelector(CONFIG.SELECTORS.DRAWER),
    DRAWER_H1: document.querySelectorAll(CONFIG.SELECTORS.DRAWER_H1),
    DRAWER_H2: document.querySelectorAll(CONFIG.SELECTORS.DRAWER_H2),
    CONTROLLER: document.querySelector(CONFIG.SELECTORS.NAVIGATION_CONTROLLER),
    CONTROLLER_BUTTON: document.querySelectorAll(CONFIG.SELECTORS.NAVIGATION_CONTROLLER_BUTTON),
  },
  CONTENT: {
    ROOT: document.querySelector(CONFIG.SELECTORS.ROOT_CONTENT),
    ARTICAL_ANCHOR: document.querySelectorAll(CONFIG.SELECTORS.ARTICAL_ANCHOR),
    ARTICAL_BULLET: document.querySelectorAll(CONFIG.SELECTORS.ARTICAL_BULLET),
  },
};

function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      fn.apply(this, args);
      lastCall = now;
    }
  };
}

function initNavigationDrawer() {
  if (DOM.NAVIGATION.DRAWER) {
    DOM.THEME.ROOT.setAttribute("o-showdrawer", window.innerWidth <= CONFIG.BREAKPOINTS.MEDIUM ? false : true);

    const onDocumentClick = () => DOM.THEME.ROOT.setAttribute("o-showdrawer", false);
    toggleContentFlowClickListener(window.innerWidth <= CONFIG.BREAKPOINTS.LARGE, onDocumentClick);

    window.onresize = () => {
      if (window.innerWidth <= CONFIG.BREAKPOINTS.LARGE) {
        toggleContentFlowClickListener(true, onDocumentClick);
      } else {
        DOM.THEME.ROOT.setAttribute("o-showdrawer", true);
        toggleContentFlowClickListener(false, onDocumentClick);
      }
    };

    let enterTimeout;
    const onPointerEnter = () => {
      enterTimeout = setTimeout(() => DOM.THEME.ROOT.setAttribute("o-showdrawer", true), 500);
    };
    const onPointerLeave = () => clearTimeout(enterTimeout);
    const onClick = () => DOM.THEME.ROOT.setAttribute("o-showdrawer", true);
    const onCloseClick = () => DOM.THEME.ROOT.setAttribute("o-showdrawer", false);

    DOM.NAVIGATION.CONTROLLER.addEventListener("pointerenter", onPointerEnter);
    DOM.NAVIGATION.CONTROLLER.addEventListener("pointerleave", onPointerLeave);
    DOM.NAVIGATION.CONTROLLER_BUTTON.forEach((element) => element.addEventListener("click", onClick));
    document.querySelector("#navigation-drawer-close").addEventListener("click", onCloseClick);

    const onH1Click = (event) => {
      const parentDetails = event.target.closest("details");
      if (parentDetails instanceof HTMLElement) {
        parentDetails.open = !parentDetails.open;
      }
    };
    const onH2Click = () => window.innerWidth <= CONFIG.BREAKPOINTS.LARGE && DOM.THEME.ROOT.setAttribute("o-showdrawer", false);

    DOM.NAVIGATION.DRAWER_H1.forEach((element) => element.addEventListener("click", onH1Click));
    DOM.NAVIGATION.DRAWER_H2.forEach((element) => element.addEventListener("click", onH2Click));
  }
}

function toggleContentFlowClickListener(shouldAdd, callback) {
  if (shouldAdd) {
    DOM.CONTENT.ROOT.addEventListener("click", callback);
  } else {
    DOM.CONTENT.ROOT.removeEventListener("click", callback);
  }
}

function activateNavigationBar() {
  try {
    const activatedSegment = document.querySelector(`a[href="${DOM.THEME.PAGE_CURRENT}"]`);
    const inactiveSegment = activatedSegment.querySelector(".navigation-segment-inactive");
    inactiveSegment.className = "navigation-segment-active";
  } catch (err) {
    document.querySelector("#navigation-destinations > div").className = "navigation-segment-active";
  }
}

/**
 * 链接跳转事件
 * @param {HTMLElement} linkElement
 */
function handleLinkDelayRedirection(linkElement) {
  linkElement.addEventListener("click", (event) => {
    event.preventDefault();
    const redirectDelay = 240;
    const target = linkElement.target;

    setTimeout(() => {
      if (target === "_blank") {
        window.open(linkElement.href);
      } else {
        displayLoadingScreen();
        window.location.href = linkElement.href;
      }
    }, redirectDelay);
  });
}

/**
 * 初始模态框
 */
function initializeModal() {
  const openHandlers = async () => await DOM.THEME.MWC_DIALOG.show();
  const closeHandler = async () => await DOM.THEME.MWC_DIALOG.close();

  DOM.THEME.MWC_DIALOG_BUTTON_OPEN.forEach((element) => element.addEventListener("click", openHandlers));

  DOM.THEME.MWC_DIALOG_BUTTON_CLOSE.addEventListener("click", closeHandler);
}

/**
 * 增加加载屏幕
 */
function displayLoadingScreen() {
  DOM.THEME.ROOT.removeAttribute("o-onload");
}

/**
 * 移除加载屏幕
 * @param {number} delay - 延迟时间，默认为450毫秒
 */
function removeLoadingScreen(delay = 450) {
  setTimeout(() => {
    DOM.THEME.ROOT.setAttribute("o-onload", "");
    DOM.THEME.LOADING_SPLASH.style.display = "none";
  }, delay);
}

/**
 * 随机旋转列表的Bullet
 */
function rotateBulletPoints() {
  const styleElement = document.createElement("style");
  document.head.appendChild(styleElement);

  Array.from(DOM.CONTENT.ARTICAL_BULLET).forEach((_, index) => {
    const rotationDegrees = Math.floor(Math.random() * 360);
    const cssRule = `ul li:nth-child(${index + 1})::before { transform: rotate(${rotationDegrees}deg); }`;
    styleElement.sheet.insertRule(cssRule, styleElement.sheet.cssRules.length);
  });
}

/**
 * 底部提示条
 * @param {string} message
 */
var snackbarQueue = [];

function createSnackbar(message) {
  const snackbarElement = document.createElement("div");
  snackbarElement.className = "snackbar";
  snackbarElement.setAttribute("visible", "false");

  const messageElement = document.createElement("p");
  messageElement.id = "snackbar-supporting";
  messageElement.textContent = message;

  snackbarElement.addEventListener("click", removeSnackbar);

  snackbarElement.appendChild(messageElement);
  document.body.appendChild(snackbarElement);

  snackbarQueue.unshift(snackbarElement);
  updateSnackbarsPosition();

  setTimeout(() => {
    snackbarElement.setAttribute("visible", "true");
  }, 0);

  let countdown = 3;
  const countdownInterval = setInterval(() => {
    messageElement.textContent = `${message} (${countdown}s)`;
    countdown--;
    if (countdown < 0) {
      clearInterval(countdownInterval);
      removeSnackbar();
    }
  }, 1000);

  function removeSnackbar() {
    snackbarElement.setAttribute("visible", "false");
    snackbarElement.addEventListener("transitionend", () => {
      if (snackbarElement.getAttribute("visible") === "false") {
        const index = snackbarQueue.indexOf(snackbarElement);
        if (index !== -1) {
          snackbarQueue.splice(index, 1);
          updateSnackbarsPosition();
        }
        clearInterval(countdownInterval);
        snackbarElement.remove();
      }
    });
  }

  function updateSnackbarsPosition() {
    snackbarQueue.forEach((snackbar, index) => {
      snackbar.style.bottom = `${index * (snackbar.offsetHeight + 10) + (window.innerWidth <= CONFIG.BREAKPOINTS.MEDIUM ? 90 : 10)}px`;
    });
  }
}

/**
 * 复制标题链接
 */
function copyAnchorLink() {
  const anchorLink = this.id ? `#${this.id}` : "";
  if (anchorLink) {
    navigator.clipboard.writeText(`${window.location.href.split("#")[0]}${anchorLink}`).then(() => createSnackbar("已将快捷链接复制到剪贴板"));
  }
}

/**
 * 监听主题色更改
 * @param {*} root
 * @param {*} callback
 */
function observeThemeColorChanges(root, callback) {
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "color") {
        callback(mutation.target.getAttribute("color"));
      }
    });
  });

  const config = { attributes: true, attributeFilter: ["color"] };
  observer.observe(root, config);
}

/**
 * 布局提示
 */
let lastLayout = null;

function layoutNotfication() {
  const innerWidth = window.innerWidth;
  const logMessages = [
    { width: CONFIG.BREAKPOINTS.COMPACT, message: "切换布局到 Compact" },
    { width: CONFIG.BREAKPOINTS.MEDIUM, message: "切换布局到 Medium" },
    { width: CONFIG.BREAKPOINTS.EXPANDED, message: "切换布局到 Expended" },
    { width: CONFIG.BREAKPOINTS.LARGE, message: "切换布局到 Large" },
  ];

  for (const { width, message } of logMessages) {
    if (innerWidth <= width) {
      if (lastLayout !== message) {
        createSnackbar(message);
        lastLayout = message;
      }
      break;
    }
  }
}

/**
 * 初始化的元素状态
 */
function initState() {
  DOM.NAVIGATION.ROOT.setAttribute("spec", window.innerWidth <= CONFIG.BREAKPOINTS.MEDIUM ? "bar" : "rail");

  if (DOM.THEME.ROOT_FEED) {
    const getCardsActualHeight = (element) => {
      const style = window.getComputedStyle(element);
      return parseFloat(style.height) + parseFloat(style.marginBlockEnd || style.marginBottom);
    };

    const accumulateHeights = (orderValue) => {
      const children = Array.from(DOM.THEME.ROOT_FEED.children).filter((child) => window.getComputedStyle(child).order === orderValue);
      return children.reduce((totalHeight, child) => totalHeight + getCardsActualHeight(child), 0) + 24;
    };

    const [resultOrder1, resultOrder2] = ["1", "2"].map(accumulateHeights);

    DOM.THEME.ROOT_FEED.style.height = `${
      window.innerWidth <= CONFIG.BREAKPOINTS.MEDIUM ? resultOrder1 + resultOrder2 : Math.max(resultOrder1, resultOrder2)
    }px`;
  }
}

/**
 * 获取文章对应id
 * @param {string} postsArray
 * @param {string} urlValue
 * @returns
 */
function getIdByUrl(postsArray, urlValue) {
  return postsArray.find((post) => post.url === urlValue)?.id || DOM.THEME.PAGE_CURRENT;
}

function initSearch(postsArray) {
  try {
    console.log("初始化搜索");
    window.simpleJekyllSearch = new SimpleJekyllSearch({
      fuzzy: false,
      json: postsArray,
      noResultsText: "<p>(´。＿。｀)? 没有找到哦</p>",
      resultsContainer: document.getElementById("main-layout-search-results-container"),
      searchInput: document.getElementById("main-layout-search-input-box"),
      searchResultTemplate: `
        <a class="main-layout-search-result-item" href="{url}">
          <div class="card" spec="clear">
            <div class="card-supporting">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </div>
        </a>`,
    });
  } catch (error) {
    handleSearchInitError(error);
  }
}

function getIdByUrlAndLog(postsArray, urlValue) {
  try {
    let id = getIdByUrl(postsArray, urlValue);
    if (id === "/") return;
    createSnackbar("当前文章id：" + id);
  } catch (error) {
    createSnackbar("无法获取文章与对应id：" + error);
  }
}

function handleFetchError(error) {
  createSnackbar("在获取文章索引时发生错误：" + error);
  console.error("在获取文章索引时发生错误：", error);
}

function handleSearchInitError(error) {
  createSnackbar("无法初始化搜索功能：" + error);
  console.error("在初始化搜索时发生错误：", error);
}

function copyCodeToClipboard(e) {
  const highlightBlock = e.target.closest(".highlight");
  const codeToCopy = highlightBlock.querySelector("code").innerText;
  navigator.clipboard
    .writeText(codeToCopy)
    .then(() => createSnackbar("已将代码复制到剪贴板"))
    .catch((error) => createSnackbar("未能将代码复制到剪贴板：" + error));
}

class ContentManager {
  static init() {
    this.initScrollBehavior();
  }

  static initScrollBehavior() {
    let lastScroll = 0;

    DOM.CONTENT.ROOT.addEventListener(
      "scroll",
      throttle(() => {
        const { scrollTop } = DOM.CONTENT.ROOT;
        const direction = scrollTop > lastScroll ? "down" : "up";

        DOM.THEME.ROOT.setAttribute("o-increasescroll", direction === "down" && scrollTop >= 500);

        this.scrollButton(scrollTop >= 400);
        lastScroll = scrollTop;
      }, 100)
    );
  }

  static scrollButton(visible) {
    DOM.THEME.SCROLL_BUTTON.forEach((btn) => {
      btn.addEventListener("click", () => DOM.CONTENT.ROOT.scrollTo({ top: 0 }));
      btn.style.cssText = `opacity: ${visible ? 1 : 0}; visibility: ${visible ? "visible" : "hidden"}`;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ContentManager.init();

  // 随机旋转列表mark
  rotateBulletPoints();

  // 获取postsmap.json并初始化搜索
  const siteRoot = window.location.origin;
  fetch(`${siteRoot}/assets/postsmap.json`)
    .then((response) => {
      if (!response.ok) throw new Error("无法获取文章索引");
      return response.json();
    })
    .then((postsArray) => {
      initSearch(postsArray);
      getIdByUrlAndLog(postsArray, window.location.pathname);
    })
    .catch((error) => handleFetchError(error));

  // 标题锚点点击事件
  DOM.CONTENT.ARTICAL_ANCHOR.forEach((element) => element.addEventListener("click", copyAnchorLink));

  // 复制按钮点击事件
  DOM.THEME.COPY_BUTTON.forEach((element) => element.addEventListener("click", copyCodeToClipboard));

  // 初始化模态框
  if (DOM.THEME.MWC_DIALOG) initializeModal();

  // 创建跳转延迟
  DOM.THEME.DELAY_REDIRECT.forEach(handleLinkDelayRedirection);

  // 移除加载屏幕
  removeLoadingScreen(1500);

  // 监听主题色更改
  observeThemeColorChanges(DOM.THEME.ROOT, function (color) {
    createSnackbar("主题色已更改为 " + color);
    generateColorPalette(argbFromHex(color));
  });
});

window.onpageshow = () => {
  initState();

  // 初始化缩放事件
  window.addEventListener("resize", () => {
    initState();
    layoutNotfication();
  });

  // 创建主题色调色板
  if (DOM.THEME.COLOR_HEX) {
    generateColorPalette(argbFromHex(DOM.THEME.COLOR_HEX));
  }

  // 初始化侧边栏
  initNavigationDrawer();

  // 初始化导航栏
  activateNavigationBar();
};
