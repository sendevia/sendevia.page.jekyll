import { argbFromHex } from "@material/material-color-utilities";
import { generateColorPalette } from "./monet";
import "simple-jekyll-search/dest/simple-jekyll-search.min.js";
import "giscus";

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
const themeDialog = document.querySelector(".modal-dialog");
/**
 * 主题 - 模态对话框 - 状态控制器（开启）
 */
const themeDialogControllerOpen = document.querySelectorAll("#default-header-webinfo, #appbar-InfoIcon");
/**
 * 主题 - 模态对话框 - 状态控制器（关闭）
 */
const themeDialogControllerClose = document.querySelector("#dialog-close");
/**
 * 主题 - 跳转到页首
 */
const themeScrollToTop = document.querySelectorAll("#main-layout-scrolltop");
/**
 * 主题 - 涟漪效果元素
 */
const themeRippleElements = document.querySelectorAll(
  `#main-layout-content-filler[spec='article'] li a, #main-layout-content-filler[spec='article'] p a, button, .card[spec='clear'], .card[spec='focus'], #navigation-drawer details a, .navigation-destination-accent, .default-header-webinfo, .carousel-article`
);
/**
 * 主题 - 延迟跳转元素
 */
const themeDelayRedirect = document.querySelectorAll(
  "#navigation-drawer-backward, .main-layout-search-result-item, #main-layout-content-filler .card a, .carousel-article, #navigation-destinations a, .p-posts-timeline-post-card a, .main-layout-quicklinks, .p-pixivgallery a"
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
/**
 * Carousel - 内容容器
 */
const carouselContainer = document.querySelector(".carousel");
/**
 * Carousel - 状态控制器
 */
const carouselController = carouselContainer ? carouselContainer.querySelectorAll(".carousel-control") : [];
/**
 * Carousel - 展示的文章
 */
const carouselPostList = carouselContainer ? carouselContainer.querySelector("#carousel-container") : [];

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
  mobileAppBar.setAttribute("scroll", scrollPosition >= scrollThreshold ? "true" : "false");

  themeRoot.setAttribute("o-increasescroll", scrollDirection === "down" && scrollPosition >= 500 ? "true" : "false");

  themeScrollToTop.forEach((element) => {
    element.style.opacity = scrollPosition >= 400 ? "1" : "0";
    element.style.visibility = scrollPosition >= 400 ? "visible" : "hidden";
  });

  lastScrollY = scrollPosition;
}

/**
 * 链接跳转事件
 * @param {string} linkElement
 */
function handleLinkDelayRedirection(linkElement) {
  linkElement.addEventListener("click", (event) => {
    event.preventDefault();
    const redirectDelay = 240;
    const target = linkElement.target;

    if (target === "_blank") {
      setTimeout(() => {
        window.open(linkElement.href);
      }, redirectDelay);
    } else {
      displayLoadingScreen();
      setTimeout(() => {
        window.location.href = linkElement.href;
      }, redirectDelay);
    }
  });
}

/**
 * 初始模态框
 */
function initializeModal() {
  const toggleBodyBlur = (shouldBlur) => {
    themeRoot.toggleAttribute("o-bodyblur", shouldBlur);
  };

  const openModal = () => {
    toggleBodyBlur(true);
    themeDialog.showModal();
  };

  const closeModal = () => {
    toggleBodyBlur(false);
    themeDialog.style.animation = `var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized) 1 normal both modal-dialog-container-close`;
    setTimeout(() => {
      themeDialog.close();
      themeDialog.style.animation = "";
    }, 400);
  };

  const handleKeyboardEvent = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
    }
  };

  const handleClickOutsideEvent = (event) => {
    if (event.target === themeDialog) {
      closeModal();
    }
  };

  themeDialogControllerOpen.forEach((element) => element.addEventListener("click", openModal));
  themeDialogControllerClose.addEventListener("click", closeModal);
  themeDialog.addEventListener("keydown", handleKeyboardEvent);
  themeDialog.addEventListener("click", handleClickOutsideEvent);
}

/**
 * 增加加载屏幕
 */
function displayLoadingScreen() {
  themeRoot.removeAttribute("o-onload");
}

/**
 * 移除加载屏幕
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

  const listItems = Array.from(contentRotationListItemsBullet);
  listItems.forEach((_, index) => {
    const rotationDegrees = Math.floor(Math.random() * 360);
    const cssRule = `ul li:nth-child(${index + 1})::before { transform: rotate(${rotationDegrees}deg); }`;
    styleElement.sheet.insertRule(cssRule, styleElement.sheet.cssRules.length);
  });
}

var snackbarQueue = [];
/**
 * 底部提示条
 * @param {string} message
 */
function createSnackbar(message) {
  const snackbarElement = document.createElement("div");
  snackbarElement.className = "snackbar";
  snackbarElement.setAttribute("visible", "false");

  const messageElement = document.createElement("p");
  messageElement.id = "snackbar-supporting";
  messageElement.textContent = message;

  const closeButton = document.createElement("button");
  closeButton.textContent = "close";
  closeButton.className = "icon-button";
  closeButton.id = "snackbar-icon";
  closeButton.addEventListener("click", () => removeSnackbar());

  snackbarElement.appendChild(messageElement);
  snackbarElement.appendChild(closeButton);
  document.body.appendChild(snackbarElement);

  snackbarQueue.unshift(snackbarElement);
  snackbarQueue.forEach((snackbar) => {
    snackbar.style.bottom = `${snackbarQueue.indexOf(snackbar) * (snackbar.offsetHeight + 10) + (window.innerWidth <= bpMedium ? 90 : 10)}px`;
  });

  setTimeout(() => {
    snackbarElement.setAttribute("visible", "true");
  }, 0);

  setTimeout(() => removeSnackbar(), 5000);

  function removeSnackbar() {
    snackbarElement.setAttribute("visible", "false");
    snackbarElement.addEventListener("transitionend", () => {
      if (snackbarElement.getAttribute("visible") === "false") {
        const index = snackbarQueue.indexOf(snackbarElement);
        if (index !== -1) {
          snackbarQueue.splice(index, 1);
          snackbarQueue.forEach(
            (snackbar) =>
              (snackbar.style.bottom = `${snackbarQueue.indexOf(snackbar) * (snackbar.offsetHeight + 10) + (window.innerWidth <= bpMedium ? 90 : 10)}px`)
          );
        }
        snackbarElement.remove();
      }
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
  const observer = new MutationObserver(function (mutationsList) {
    for (let mutation of mutationsList) {
      if (mutation.type === "attributes" && mutation.attributeName === "color") {
        callback(mutation.target.getAttribute(mutation.attributeName));
      }
    }
  });
  const config = { attributes: true, attributeFilter: ["color"] };
  observer.observe(root, config);
}

/**
 * 布局提示
 */
function layoutNotfication() {
  const innerWidth = window.innerWidth;
  const logMessages = {
    600: "切换布局到 Compact",
    840: "切换布局到 Medium",
    1200: "切换布局到 Expended",
    1600: "切换布局到 Large",
  };

  for (const width in logMessages) {
    if (innerWidth === Number(width)) {
      createSnackbar(logMessages[width]);
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
      const computedStyle = window.getComputedStyle(element);
      const height = parseFloat(computedStyle.height);
      const marginBlockEnd = parseFloat(computedStyle.marginBlockEnd || computedStyle.marginBottom);
      return height + marginBlockEnd;
    };

    const accumulateHeights = (orderValue) => {
      const childrenWithOrder = Array.from(themeFeedflow.children).filter((child) => window.getComputedStyle(child).order === orderValue);
      const totalHeight = childrenWithOrder.reduce((totalHeight, child) => totalHeight + getCardsActualHeight(child), 0);
      return { count: childrenWithOrder.length, height: totalHeight + 24 };
    };

    const resultOrder1 = accumulateHeights("1");
    const resultOrder2 = accumulateHeights("2");

    if (window.innerWidth <= bpMedium) {
      var maxHeight = resultOrder1.height + resultOrder2.height;
    } else {
      var maxHeight = Math.max(resultOrder1.height, resultOrder2.height);
    }

    themeFeedflow.style.height = `${maxHeight}px`;
  }
}

/**
 * 获取文章对应id
 * @param {string} postsArray
 * @param {string} urlValue
 * @returns
 */
function getIdByUrl(postsArray, urlValue) {
  const post = postsArray.find((post) => post.url === urlValue);
  return post ? post.id : themeCurrentPage;
}

/**
 * 添加涟漪效果
 * @param {selector} parentElement
 */
function effectRipple(parentElement) {
  const clearRipple = (parentElement) => {
    const rippleR = parentElement.querySelector("ripple-effect");
    if (rippleR) {
      rippleR.style.opacity = 0;
      parentElement.removeChild(rippleR);
    }
  };

  const addRipple = (parentElement, event) => {
    const rippleA = document.createElement("ripple-effect");

    const { clientWidth, clientHeight } = parentElement;
    const diameter = Math.max(clientWidth, clientHeight);
    const { offsetX, offsetY } = event;

    rippleA.style.setProperty("--ripple-effect-PosX", offsetX);
    rippleA.style.setProperty("--ripple-effect-PosY", offsetY);
    rippleA.style.setProperty("--ripple-effect-Diameter", diameter);

    parentElement.appendChild(rippleA);
  };

  let isLongPress = false;
  let isPressing = false;

  const handleMouseDown = (event) => {
    isPressing = true;
    isLongPress = false;

    // 设置一个短延时用于判断是否为短按
    setTimeout(() => {
      if (isPressing) {
        isLongPress = true;
        addRipple(parentElement, event);
      }
    }, 100); // 可以根据需要调整延时时间
  };

  const handleMouseUp = (event) => {
    if (isPressing) {
      if (!isLongPress) {
        addRipple(parentElement, event);
      }
      isPressing = false;
    }
  };

  parentElement.addEventListener("mousedown", handleMouseDown);
  parentElement.addEventListener("mouseup", handleMouseUp);
  parentElement.addEventListener("mouseleave", () => {
    isPressing = false;
  });
  parentElement.addEventListener("animationend", () => clearRipple(parentElement));
}

window.onload = () => {
  // 初始化涟漪效果
  themeRippleElements.forEach(effectRipple);

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
      if (!response.ok) {
        createSnackbar("无法获取postsmap.json文件");
      }
      return response.json();
    })
    .then((postsArray) => {
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
        createSnackbar("无法初始化搜索功能：" + error);
        console.error("在初始化搜索时发生错误：", error);
      }

      // 获取文章与对应id
      try {
        let id = getIdByUrl(postsArray, window.location.pathname);
        if (id == "/") {
          return;
        }
        createSnackbar("当前文章id：" + id);
      } catch (error) {
        createSnackbar("无法获取文章与对应id：" + error);
      }
    })
    .catch((error) => {
      createSnackbar("在获取postsmap.json文件时发生错误：" + error);
      console.error("在获取postsmap.json文件时发生错误：", error);
    });

  // 标题锚点点击事件
  contentAnchors.forEach((element) => {
    element.addEventListener("click", copyAnchorLink);
  });

  // 复制按钮点击事件
  themeCopyButtons.forEach((element) =>
    element.addEventListener("click", (e) => {
      const highlightBlock = e.target.closest(".highlight");
      const codeToCopy = highlightBlock.querySelector("code").innerText;
      navigator.clipboard
        .writeText(codeToCopy)
        .then(() => createSnackbar("已将代码复制到剪贴板"))
        .catch((error) => createSnackbar("未能将代码复制到剪贴板：" + error));
    })
  );

  // 测试按钮点击事件
  const testButton = document.getElementById("JTM-P-Components-Snackbar-Test");
  if (testButton) {
    testButton.addEventListener("click", () => createSnackbar(testButton.innerText));
  }

  // 初始化模态框
  if (themeDialog) {
    initializeModal();
  }

  // 创建跳转延迟
  themeDelayRedirect.forEach(handleLinkDelayRedirection);

  // 初始化文章轮播
  if (carouselContainer && carouselPostList && carouselController.length === 2) {
    var currentValue = 1;
    carouselPostList.setAttribute("data-scroll", currentValue);

    function updateValue(direction) {
      currentValue += direction;
      if (currentValue > 3) {
        currentValue = 1;
      } else if (currentValue < 1) {
        currentValue = 3;
      }
      carouselPostList.setAttribute("data-scroll", currentValue);
    }

    carouselController[0].addEventListener("click", function () {
      updateValue(-1);
    });

    carouselController[1].addEventListener("click", function () {
      updateValue(1);
    });

    carouselPostList.addEventListener("wheel", function (event) {
      event.preventDefault();
      updateValue(event.deltaY > 0 ? 1 : -1);
    });

    window.addEventListener(
      "wheel",
      function (event) {
        if (event.target === carouselPostList) {
          event.preventDefault();
        }
      },
      { passive: false }
    );
  }

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
  if (navigationDrawer) {
    const onDocumentClick = () => themeRoot.setAttribute("o-showdrawer", false);
    themeRoot.setAttribute("o-showdrawer", window.innerWidth <= bpMedium ? false : true);
    window.innerWidth <= bpLarge ? contentFlow.addEventListener("click", onDocumentClick) : contentFlow.removeEventListener("click", onDocumentClick);
    window.onresize = () => {
      if (window.innerWidth <= bpLarge) {
        contentFlow.addEventListener("click", onDocumentClick);
      } else {
        themeRoot.setAttribute("o-showdrawer", true);
        contentFlow.removeEventListener("click", onDocumentClick);
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
      const element = event.target;
      const parentDetails = element.closest("details");
      if (parentDetails instanceof HTMLElement) {
        parentDetails.open = !parentDetails.open;
      }
    };
    const onH2Click = () => {
      if (window.innerWidth <= bpLarge) {
        themeRoot.setAttribute("o-showdrawer", false);
      }
    };

    navigationDrawerH1Entries.forEach((element) => element.addEventListener("click", onH1Click));
    navigationDrawerH2Entries.forEach((element) => element.addEventListener("click", onH2Click));
  }

  // 初始化导航栏
  try {
    const activatedSegment = document.querySelector(`a[href="${themeCurrentPage}"]`);
    const inactiveSegment = activatedSegment.querySelector(".navigation-segment-inactive");
    inactiveSegment.className = "navigation-segment-active";
  } catch (err) {
    document.querySelector("#navigation-destinations > div").className = "navigation-segment-active";
  }
};
