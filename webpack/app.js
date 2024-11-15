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

/**
 * 主题 - 根节点
 */
const themeRoot = document.querySelector(".theme-root");
/**
 * 主题 - 加载闪屏
 */
const themeLoadingIndicator = document.querySelector(".loading-splash");
/**
 * 主题 - 定位当前所在页面
 */
const themeCurrentPage = window.location.pathname;
/**
 * 主题 - 模态对话框
 */
const themeDialog = document.querySelector("md-dialog");
/**
 * 主题 - 模态对话框 - 状态控制器（开启）
 */
const themeDialogControllerOpen = document.querySelectorAll("#default-header-webinfo, #appbar-InfoIcon");
/**
 * 主题 - 模态对话框 - 状态控制器（关闭）
 */
const themeDialogControllerClose = document.querySelector("md-dialog div[slot='actions'] md-text-button");
/**
 * 主题 - 跳转到页首
 */
const themeScrollToTop = document.querySelectorAll("#main-layout-scrolltop");
/**
 * 主题 - 延迟跳转元素
 */
const themeDelayRedirect = document.querySelectorAll(
  "#navigation-drawer-backward, .main-layout-search-result-item, #main-layout-content-filler .card a, #navigation-destinations a, .p-posts-timeline-post-card a, .main-layout-quicklinks, .p-pixivgallery a"
);
/**
 * 主题 - 复制代码块的按钮
 */
const themeCopyButtons = document.querySelectorAll("div.blockcopy");
/**
 * 主题 - 首页文章瀑布流容器
 */
const themeFeedflow = document.querySelector(".main-layout[spec='feed'] #main-layout-content-filler");
/**
 * 调色盘 - HEX颜色
 */
const paletteHEX = document.body.getAttribute("color");
/**
 * 文章 - 内容流
 */
const contentFlow = document.querySelector("#main-layout-content-flow");
/**
 * 文章 - 标题锚点
 */
const contentAnchors = document.querySelectorAll("#main-layout-content-filler section:nth-child(1) h1");
/**
 * 文章 - ul随机旋转的marker
 */
const contentRotationListItemsBullet = document.querySelectorAll("ul li");
/**
 * 全局导航栏
 */
const navigationContainer = document.querySelector(".navigation");
/**
 * 全局导航栏 - 展开
 */
const navigationDrawer = document.querySelector("#navigation-drawer");
/**
 * 全局导航栏 - 展开 - 一级目录元素
 */
const navigationDrawerH1Entries = navigationDrawer ? navigationDrawer.querySelectorAll("details summary > a") : [];
/**
 * 全局导航栏 - 展开 - 二级目录元素
 */
const navigationDrawerH2Entries = navigationDrawer ? navigationDrawer.querySelectorAll("details > a") : [];
/**
 * 全局导航栏 - 状态控制器
 */
const navigationController = document.querySelector("#navigation-destinations > div");
/**
 * 全局导航栏 - 状态控制器按钮
 */
const navigationControllerButton = document.querySelectorAll("#appbar-menu, #navigation-drawer-close");
/**
 * 搜索 - 状态控制器
 */
const searchContainerController = document.querySelectorAll("#navigation-fab > button, #appbar-search");
/**
 * 移动端 - 标题栏
 */
const mobileAppBar = document.querySelector(".appbar");

const bpLarge = 1600;
const bpExpanded = 1200;
const bpMedium = 840;
const bpCompact = 600;

/**
 * 滚动事件
 */
let lastScrollY = 0;

function scrollHandler() {
  const scrollPosition = contentFlow.scrollTop;
  const scrollThreshold = 64;
  const scrollDirection = scrollPosition > lastScrollY ? "down" : "up";

  mobileAppBar.setAttribute("scroll", scrollPosition >= scrollThreshold);

  themeRoot.setAttribute("o-increasescroll", scrollDirection === "down" && scrollPosition >= 500);

  const opacityVisibility = scrollPosition >= 400;
  themeScrollToTop.forEach((element) => {
    element.style.opacity = opacityVisibility ? "1" : "0";
    element.style.visibility = opacityVisibility ? "visible" : "hidden";
  });

  lastScrollY = scrollPosition;
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
  const openHandlers = async () => await themeDialog.show();
  const closeHandler = async () => await themeDialog.close();

  themeDialogControllerOpen.forEach((element) => element.addEventListener("click", openHandlers));

  themeDialogControllerClose.addEventListener("click", closeHandler);
}

/**
 * 增加加载屏幕
 */
function displayLoadingScreen() {
  themeRoot.removeAttribute("o-onload");
}

/**
 * 移除加载屏幕
 * @param {number} delay - 延迟时间，默认为450毫秒
 */
function removeLoadingScreen(delay = 450) {
  setTimeout(() => {
    themeRoot.setAttribute("o-onload", "");
    themeLoadingIndicator.style.display = "none";
  }, delay);
}

/**
 * 随机旋转列表的Bullet
 */
function rotateBulletPoints() {
  const styleElement = document.createElement("style");
  document.head.appendChild(styleElement);

  Array.from(contentRotationListItemsBullet).forEach((_, index) => {
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

  setTimeout(removeSnackbar, 5000);

  function removeSnackbar() {
    snackbarElement.setAttribute("visible", "false");
    snackbarElement.addEventListener("transitionend", () => {
      if (snackbarElement.getAttribute("visible") === "false") {
        const index = snackbarQueue.indexOf(snackbarElement);
        if (index !== -1) {
          snackbarQueue.splice(index, 1);
          updateSnackbarsPosition();
        }
        snackbarElement.remove();
      }
    });
  }

  function updateSnackbarsPosition() {
    snackbarQueue.forEach((snackbar, index) => {
      snackbar.style.bottom = `${index * (snackbar.offsetHeight + 10) + (window.innerWidth <= bpMedium ? 90 : 10)}px`;
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
    { width: bpCompact, message: "切换布局到 Compact" },
    { width: bpMedium, message: "切换布局到 Medium" },
    { width: bpExpanded, message: "切换布局到 Expended" },
    { width: bpLarge, message: "切换布局到 Large" },
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
  navigationContainer.setAttribute("spec", window.innerWidth <= bpMedium ? "bar" : "rail");

  if (themeFeedflow) {
    const getCardsActualHeight = (element) => {
      const style = window.getComputedStyle(element);
      return parseFloat(style.height) + parseFloat(style.marginBlockEnd || style.marginBottom);
    };

    const accumulateHeights = (orderValue) => {
      const children = Array.from(themeFeedflow.children).filter((child) => window.getComputedStyle(child).order === orderValue);
      return children.reduce((totalHeight, child) => totalHeight + getCardsActualHeight(child), 0) + 24;
    };

    const [resultOrder1, resultOrder2] = ["1", "2"].map(accumulateHeights);

    themeFeedflow.style.height = `${window.innerWidth <= bpMedium ? resultOrder1 + resultOrder2 : Math.max(resultOrder1, resultOrder2)}px`;
  }
}

/**
 * 获取文章对应id
 * @param {string} postsArray
 * @param {string} urlValue
 * @returns
 */
function getIdByUrl(postsArray, urlValue) {
  return postsArray.find((post) => post.url === urlValue)?.id || themeCurrentPage;
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

window.onload = () => {
  // 初始化滚动监听
  contentFlow.onscroll = scrollHandler;

  // 初始化跳转到页首按钮
  themeScrollToTop.forEach((element) => element.addEventListener("click", () => contentFlow.scrollTo({ top: 0 })));

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
  contentAnchors.forEach((element) => element.addEventListener("click", copyAnchorLink));

  // 复制按钮点击事件
  themeCopyButtons.forEach((element) => element.addEventListener("click", copyCodeToClipboard));

  // 初始化模态框
  if (themeDialog) initializeModal();

  // 创建跳转延迟
  themeDelayRedirect.forEach(handleLinkDelayRedirection);

  // 移除加载屏幕
  removeLoadingScreen(1500);

  // 监听主题色更改
  observeThemeColorChanges(themeRoot, function (color) {
    createSnackbar("主题色已更改为 " + color);
    generateColorPalette(argbFromHex(color));
  });
};

window.onpageshow = () => {
  initState();

  // 初始化缩放事件
  window.addEventListener("resize", () => {
    initState();
    layoutNotfication();
  });

  // 创建主题色调色板
  if (paletteHEX) {
    generateColorPalette(argbFromHex(paletteHEX));
  }

  // 初始化侧边栏
  initNavigationDrawer();

  // 初始化导航栏
  activateNavigationBar();
};

function initNavigationDrawer() {
  if (navigationDrawer) {
    themeRoot.setAttribute("o-showdrawer", window.innerWidth <= bpMedium ? false : true);

    const onDocumentClick = () => themeRoot.setAttribute("o-showdrawer", false);
    toggleContentFlowClickListener(window.innerWidth <= bpLarge, onDocumentClick);

    window.onresize = () => {
      if (window.innerWidth <= bpLarge) {
        toggleContentFlowClickListener(true, onDocumentClick);
      } else {
        themeRoot.setAttribute("o-showdrawer", true);
        toggleContentFlowClickListener(false, onDocumentClick);
      }
    };

    let enterTimeout;
    const onPointerEnter = () => {
      enterTimeout = setTimeout(() => themeRoot.setAttribute("o-showdrawer", true), 500);
    };
    const onPointerLeave = () => clearTimeout(enterTimeout);
    const onClick = () => themeRoot.setAttribute("o-showdrawer", true);
    const onCloseClick = () => themeRoot.setAttribute("o-showdrawer", false);

    navigationController.addEventListener("pointerenter", onPointerEnter);
    navigationController.addEventListener("pointerleave", onPointerLeave);
    navigationControllerButton.forEach((element) => element.addEventListener("click", onClick));
    document.querySelector("#navigation-drawer-close").addEventListener("click", onCloseClick);

    const onH1Click = (event) => {
      const parentDetails = event.target.closest("details");
      if (parentDetails instanceof HTMLElement) {
        parentDetails.open = !parentDetails.open;
      }
    };
    const onH2Click = () => window.innerWidth <= bpLarge && themeRoot.setAttribute("o-showdrawer", false);

    navigationDrawerH1Entries.forEach((element) => element.addEventListener("click", onH1Click));
    navigationDrawerH2Entries.forEach((element) => element.addEventListener("click", onH2Click));
  }
}

function toggleContentFlowClickListener(shouldAdd, callback) {
  if (shouldAdd) {
    contentFlow.addEventListener("click", callback);
  } else {
    contentFlow.removeEventListener("click", callback);
  }
}

function activateNavigationBar() {
  try {
    const activatedSegment = document.querySelector(`a[href="${themeCurrentPage}"]`);
    const inactiveSegment = activatedSegment.querySelector(".navigation-segment-inactive");
    inactiveSegment.className = "navigation-segment-active";
  } catch (err) {
    document.querySelector("#navigation-destinations > div").className = "navigation-segment-active";
  }
}
