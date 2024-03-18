import { argbFromHex } from "@material/material-color-utilities";
import { generateColorPalette } from "./_components/monet";
import { effectRipple } from "./_components/ripple";
import "simple-jekyll-search/dest/simple-jekyll-search.min.js";

/**
 * 主题 - 根节点
 */
const themeRoot = document.querySelector(".t-root");
/**
 * 主题 - 加载指示器
 */
const themeLoadingIndicator = document.querySelector(".s-loading");
/**
 * 主题 - 定位当前所在页面
 */
const themeCurrentPage = window.location.pathname;
/**
 * 主题 - 模态对话框
 */
const themeDialog = document.querySelector(".c-dialog");
/**
 * 主题 - 模态对话框 - 状态控制器（开启）
 */
const themeDialogControllerOpen = document.querySelectorAll("#s-header-webinfo, #c-appbar-InfoIcon");
/**
 * 主题 - 模态对话框 - 状态控制器（关闭）
 */
const themeDialogControllerClose = document.querySelector("#dialog-close");
/**
 * 主题 - 跳转到页首
 */
const themeScrollToTop = document.querySelectorAll(".s-scrolltop");
/**
 * 主题 - 涟漪效果元素
 */
const themeRippleElements = document.querySelectorAll(
  `#s-unilayout-content-filler[spec='article'] li a, #s-unilayout-content-filler[spec='article'] p a, button, .c-card[spec='clear'], .c-card[spec='focus'], #c-navigation-drawer details a, .c-navigation-destination-accent, .s-header-webinfo, .s-carousel-article`
);
/**
 * 主题 - 延迟跳转元素
 */
const themeDelayRedirect = document.querySelectorAll(
  ".c-search-result-item, #p-index-latest-article--title > a, .p-index-card, .s-carousel-article, #c-navigation-destinations a, .p-posts-timeline-post-card a, .s-quickjmp"
);
/**
 * 主题 - 复制代码块的按钮
 */
const themeCopyButtons = document.querySelectorAll("span.copy-button");
/**
 * 调色盘 - HEX颜色
 */
const paletteHEX = document.body.getAttribute("color");
/**
 * 文章 - 内容流
 */
const contentFlow = document.querySelector("#s-unilayout-content-flow");
/**
 * 文章 - ul随机旋转的marker
 */
const contentRotationListItemsBullet = document.querySelectorAll("ul li");
/**
 * 全局导航栏
 */
const navigationContainer = document.querySelector(".c-navigation");
/**
 * 全局导航栏 - 展开
 */
const navigationDrawer = document.querySelector("#c-navigation-drawer");
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
const navigationController = document.querySelector("#c-navigation-destinations > div");
/**
 * 全局导航栏 - 状态控制器按钮
 */
const navigationControllerButton = document.querySelectorAll("#c-appbar-menu, #c-navigation-drawer-close");
/**
 * 搜索 - 状态控制器
 */
const searchContainerController = document.querySelectorAll("#c-navigation-fab > button, #c-appbar-search, #c-search-input-box > button");
/**
 * 移动端 - 标题栏
 */
const mobileAppBar = document.querySelector(".c-appbar");
/**
 * Carousel - 内容容器
 */
const carouselContainer = document.querySelector(".s-carousel");
/**
 * Carousel - 状态控制器
 */
const carouselController = carouselContainer ? carouselContainer.querySelectorAll(".s-carousel-control") : [];
/**
 * Carousel - 展示的文章
 */
const carouselPostList = carouselContainer ? carouselContainer.querySelector("#s-carousel-container") : [];

/**
 * 切换 attribute
 */
function toggleAttr(element, attribute, boolean) {
  element.toggleAttribute(attribute, boolean);
}

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
 * 缩放事件
 */
function handleResize() {
  navigationContainer.setAttribute("spec", window.innerWidth <= 648 ? "bar" : "rail");
  navigationDrawer.toggleAttribute("show", window.innerWidth >= 1100 ? true : false);
}

/**
 * 链接跳转事件
 */
function handleLinkDelayRedirection(linkElement) {
  linkElement.addEventListener("click", (event) => {
    event.preventDefault();
    const redirectDelay = 240;
    const target = linkElement.target;

    if (target === "_blank") {
      window.open(linkElement.href);
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
    themeDialog.style.animation = `var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized) 1 normal both c-dialog-container-close`;
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
function removeLoadingScreen() {
  const loadingDelay = 450;
  themeRoot.setAttribute("o-onload", "");
  setTimeout(() => {
    themeLoadingIndicator.style.display = "none";
  }, loadingDelay);
}

/**
 * 随机旋转列表的Bullet
 */
function rotateBulletPoints() {
  const styleElement = document.createElement("style");
  document.head.appendChild(styleElement);

  const listItems = Array.from(contentRotationListItemsBullet);
  listItems.forEach((listItem, index) => {
    const rotationDegrees = Math.floor(Math.random() * 360);
    const cssRule = `ul li:nth-child(${index + 1})::before { transform: rotate(${rotationDegrees}deg); }`;
    styleElement.sheet.insertRule(cssRule, styleElement.sheet.cssRules.length);
  });
}

/**
 * 底部提示条
 */
var snackbars = [];
function createSnackbar(message) {
  const snackbarElement = document.createElement("div");
  snackbarElement.className = "c-snackbar";
  snackbarElement.setAttribute("visible", "false");

  const messageElement = document.createElement("p");
  messageElement.id = "c-snackbar-supporting";
  messageElement.textContent = message;

  const closeButton = document.createElement("button");
  closeButton.textContent = "close";
  closeButton.className = "c-iconbtn";
  closeButton.id = "c-snackbar-icon";
  closeButton.addEventListener("click", () => {
    snackbarElement.setAttribute("visible", "false");
    setTimeout(() => {
      const index = snackbars.indexOf(snackbarElement);
      if (index !== -1) {
        snackbars.splice(index, 1);
        updateSnackbarPositions();
      }
      snackbarElement.remove();
    }, 600);
  });

  snackbarElement.appendChild(messageElement);
  snackbarElement.appendChild(closeButton);
  document.body.appendChild(snackbarElement);

  setTimeout(() => {
    snackbarElement.setAttribute("visible", "true");
  }, 0);

  snackbars.push(snackbarElement);
  updateSnackbarPositions();

  setTimeout(() => {
    snackbarElement.setAttribute("visible", "false");
    snackbarElement.addEventListener("transitionend", () => {
      if (snackbarElement.getAttribute("visible") === "false") {
        const index = snackbars.indexOf(snackbarElement);
        if (index !== -1) {
          snackbars.splice(index, 1);
          updateSnackbarPositions();
        }
        snackbarElement.remove();
      }
    });
  }, 5000);
}
function updateSnackbarPositions() {
  let bottom = window.innerWidth >= 768 ? 10 : 90;

  snackbars.forEach((snackbar) => {
    snackbar.style.bottom = `${bottom}px`;
    bottom += snackbar.offsetHeight + 10;
  });
}

window.onload = () => {
  const searchRoot = window.location.origin;
  window.simpleJekyllSearch = new SimpleJekyllSearch({
    fuzzy: false,
    json: `${searchRoot}/assets/postsmap.json`,
    noResultsText: "＞︿＜ 无结果",
    resultsContainer: document.getElementById("c-search-results-container"),
    searchInput: document.getElementById("c-search-input-box"),
    searchResultTemplate: `
      <a class="c-search-result-item" href="{url}">
        <div class="c-card" spec="clear">
          <div class="c-card-supporting">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      </a>`,
  });

  rotateBulletPoints();

  document.querySelectorAll("#s-unilayout-content-filler > h1").forEach((h1) => {
    h1.addEventListener("click", function () {
      const anchorLink = this.id ? `#${this.id}` : "";

      if (anchorLink) {
        navigator.clipboard.writeText(window.location.href.split("#")[0] + anchorLink).then(() => createSnackbar("已将快捷链接复制到剪贴板"));
      }
    });
  });
  var testButton = document.getElementById("JTM-P-Components-Snackbar-Test");
  if (testButton) {
    testButton.addEventListener("click", function () {
      createSnackbar(testButton.innerText);
    });
  }

  setTimeout(() => {
    if (paletteHEX) {
      generateColorPalette(argbFromHex(paletteHEX));
    }

    removeLoadingScreen();
  }, 500);

  themeCopyButtons.forEach((element) =>
    element.addEventListener("click", (e) => {
      const highlightBlock = e.target.closest(".highlight");
      const codeToCopy = highlightBlock.querySelector("code").innerText;
      navigator.clipboard.writeText(codeToCopy).then(() => createSnackbar("已将代码复制到剪贴板"));
    })
  );
};

window.onpageshow = () => {
  navigationContainer.setAttribute("spec", window.innerWidth <= 648 ? "bar" : "rail");
  navigationDrawer.toggleAttribute("show", window.innerWidth >= 1100 ? true : false);

  try {
    const activatedSegment = document.querySelector(`a[href="${themeCurrentPage}"]`);
    const inactiveSegment = activatedSegment.querySelector(".c-navigation-segment-inactive");
    inactiveSegment.className = "c-navigation-segment-active";
  } catch (err) {
    document.querySelector("#c-navigation-destinations > div").className = "c-navigation-segment-active";
  }

  themeScrollToTop.forEach((element) => element.addEventListener("click", () => contentFlow.scrollTo({ top: 0 })));
  themeRippleElements.forEach(effectRipple);
  contentFlow.onscroll = scrollHandler;
  window.onresize = handleResize;

  initializeModal();

  searchContainerController.forEach((element) => element.addEventListener("click", () => toggleAttr(themeRoot, "o-showsearch")));

  if (navigationDrawer) {
    let enterTimeout;
    navigationController.addEventListener("pointerenter", () => {
      enterTimeout = setTimeout(() => {
        toggleAttr(navigationDrawer, "show");
      }, 500);
    });
    navigationController.addEventListener("pointerleave", () => {
      clearTimeout(enterTimeout);
    });

    navigationControllerButton.forEach((element) => {
      element.addEventListener("click", () => {
        toggleAttr(navigationDrawer, "show");
      });
    });

    navigationDrawerH1Entries.forEach((element) => {
      element.addEventListener("click", () => {
        const parentDetails = element.closest("details");
        if (parentDetails) {
          parentDetails.open = !parentDetails.open;
        }
      });
    });
    navigationDrawerH2Entries.forEach((element) => element.addEventListener("click", () => toggleAttr(navigationDrawer, "show", false)));
    document.addEventListener("click", (event) => {
      const isJTM_C_NavigationDrawer = event.target.closest("#c-navigation-drawer");
      const isJTM_C_AppBar = event.target.closest(".c-appbar");
      const isMAB = event.target.closest("#c-navigation-fab");
      if (!isJTM_C_NavigationDrawer && (window.matchMedia("(max-width: 648px)").matches ? !isJTM_C_AppBar : !isMAB)) {
        toggleAttr(navigationDrawer, "show", false);
      }
    });
  }

  themeDelayRedirect.forEach(handleLinkDelayRedirection);

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
};
