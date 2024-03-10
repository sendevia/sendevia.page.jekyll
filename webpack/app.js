import { argbFromHex } from "@material/material-color-utilities";
import { generateColorPalette } from "./_components/monet";
import { effect_ripple } from "./_components/ripple";
import "simple-jekyll-search/dest/simple-jekyll-search.min.js";

/**
 * 主题 - 根节点
 */
const theme_Root = document.querySelector(".t-root");
/**
 * 主题 - 加载指示器
 */
const theme_LoadingIndicator = document.querySelector(".s-loading");
/**
 * 主题 - 定位当前所在页面
 */
const theme_CurrentPage = window.location.pathname;
/**
 * 主题 - 模态对话框
 */
const theme_Dialog = document.querySelector(".c-dialog");
/**
 * 主题 - 模态对话框 - 状态控制器（开启）
 */
const theme_Dialog_Controller_Open = document.querySelectorAll("#s-header-webinfo, #c-appbar-InfoIcon");
/**
 * 主题 - 模态对话框 - 状态控制器（关闭）
 */
const theme_Dialog_Controller_Close = document.querySelector("#dialog-close");
/**
 * 主题 - 跳转到页首
 */
const theme_ScrollToTop = document.querySelectorAll(".s-scrolltop");
/**
 * 主题 - 涟漪效果元素
 */
const theme_RippleElements = document.querySelectorAll(
  `#s-unilayout-content-filler[spec='article'] li a, #s-unilayout-content-filler[spec='article'] p a, button, .c-card[spec='clear'], .c-card[spec='focus'], #c-navigation-drawer details a, .c-navigation-destination-accent, .s-header-webinfo, .s-carousel-article`
);
/**
 * 主题 - 延迟跳转元素
 */
const theme_DelayRedirect = document.querySelectorAll(
  ".c-search-result-item, #p-index-latest-article--title > a, .p-index-card, .s-carousel-article, #c-navigation-destinations a, .p-posts-timeline-post-card a, .s-quickjmp"
);
/**
 * 调色盘 - HEX颜色
 */
const palette_HEX = document.body.getAttribute("color");
/**
 * 文章 - 内容流
 */
const content_Flow = document.querySelector("#s-unilayout-content-flow");
/**
 * 文章 - ul随机旋转的marker
 */
const content_RotationListItemsBullet = document.querySelectorAll("ul li");
/**
 * 全局导航栏
 */
const navigation_Container = document.querySelector(".c-navigation");
/**
 * 全局导航栏 - 展开
 */
const navigation_Drawer = document.querySelector("#c-navigation-drawer");
/**
 * 全局导航栏 - 展开 - 一级目录元素
 */
const navigation_Drawer_H1Entries = navigation_Drawer ? navigation_Drawer.querySelectorAll("details summary > a") : [];
/**
 * 全局导航栏 - 展开 - 二级目录元素
 */
const navigation_Drawer_H2Entries = navigation_Drawer ? navigation_Drawer.querySelectorAll("details > a") : [];
/**
 * 全局导航栏 - 状态控制器
 */
const navigation_Controller = document.querySelector("#c-navigation-destinations > div");
/**
 * 全局导航栏 - 状态控制器按钮
 */
const navigation_Controller_Button = document.querySelectorAll("#c-appbar-menu, #c-navigation-drawer-close");
/**
 * 搜索 - 状态控制器
 */
const search_ContainerController = document.querySelectorAll("#c-navigation-fab > button, #c-appbar-search, #c-search-input-box > button");

/**
 * 移动端 - 标题栏
 */
const mobile_AppBar = document.querySelector(".c-appbar");
/**
 * Carousel - 内容容器
 */
const carousel_Container = document.querySelector(".s-carousel");
/**
 * Carousel - 状态控制器
 */
const carousel_Controller = carousel_Container ? carousel_Container.querySelectorAll(".s-carousel-control") : [];
/**
 * Carousel - 展示的文章
 */
const carousel_PostList = carousel_Container ? carousel_Container.querySelector("#s-carousel-container") : [];

/**
 * 切换 attribute
 * @param {} element 需要切换状态的元素
 * @param {string} attribute 状态内容
 * @param {boolean} boolean
 */
function toggleAttr(element, attribute, boolean) {
  element.toggleAttribute(attribute, boolean);
}

/**
 * 滚动事件
 */
let lastScrollY = 0;
function bodyScroll() {
  const scrollY = content_Flow.scrollTop;
  const scrollThreshold = 64;
  const scrollDirection = scrollY > lastScrollY ? "down" : "up";
  mobile_AppBar.setAttribute("scroll", scrollY >= scrollThreshold ? "true" : "false");

  if (scrollDirection === "up") {
    theme_Root.setAttribute("o-onscroll", "false");
  } else if (scrollDirection === "down" && scrollY >= 500) {
    theme_Root.setAttribute("o-onscroll", "true");
  }
  theme_ScrollToTop.forEach((element) => {
    element.style.cssText = `
          opacity: ${scrollY >= 400 ? "1" : "0"};
          visibility: ${scrollY >= 400 ? "visible" : "hidden"};
        `;
  });

  lastScrollY = scrollY;
}

/**
 * 缩放事件
 */
function handleResize() {
  navigation_Container.setAttribute("spec", window.innerWidth <= 648 ? "bar" : "rail");
}

/**
 * 链接跳转事件
 */
function handleLinkDelayRedirection(link) {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const delay = 240;
    const target = link.getAttribute("target");

    if (target === "_blank") {
      window.open(link.getAttribute("href"));
    } else {
      addLoadScreen();
      setTimeout(() => {
        window.location.href = link.getAttribute("href");
      }, delay);
    }
  });
}

/**
 * 初始化模态提示框
 */
function initModal() {
  const toggleDim = (boolean) => {
    theme_Root.toggleAttribute("o-bodyblur", boolean);
  };

  const openModal = () => {
    toggleDim();
    theme_Dialog.showModal();
  };

  const closeModal = () => {
    toggleDim(false);
    theme_Dialog.style.animation = `var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized) 1 normal both c-dialog-container-close`;
    setTimeout(() => {
      theme_Dialog.close();
      theme_Dialog.style.animation = "";
    }, 400);
  };

  const handleKeyboardEvent = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
    }
  };

  const handleClickOutsideEvent = (e) => {
    if (e.target === theme_Dialog) {
      closeModal();
    }
  };

  theme_Dialog_Controller_Open.forEach((element) => element.addEventListener("click", openModal));
  theme_Dialog_Controller_Close.addEventListener("click", closeModal);
  theme_Dialog.addEventListener("keydown", handleKeyboardEvent);
  theme_Dialog.addEventListener("click", handleClickOutsideEvent);
}

/**
 * 增加加载屏幕
 */
function addLoadScreen() {
  theme_Root.removeAttribute("o-onload");
}

/**
 * 移除加载屏幕
 */
function removeLoadScreen() {
  const delay = 450;
  theme_Root.setAttribute("o-onload", true);
  setTimeout(() => {
    theme_LoadingIndicator.style.display = "none";
  }, delay);
}

/**
 * 随机旋转列表的Bullet
 */
function randomRotationBullet() {
  const style = document.createElement("style");
  document.head.appendChild(style);

  content_RotationListItemsBullet.forEach((li, index) => {
    const randomRotation = Math.floor(Math.random() * 360);
    style.sheet.insertRule(`ul li:nth-child(${index + 1})::before { transform: rotate(${randomRotation}deg); }`, style.sheet.cssRules.length);
  });
}

/**
 * 创建一个底部提示条
 */
var snackbars = [];
function createSnackbar(content) {
  var snackbar = document.createElement("div");
  snackbar.className = "c-snackbar";
  snackbar.setAttribute("visible", "false");

  var p = document.createElement("p");
  p.id = "c-snackbar-supporting";
  p.textContent = content;

  var closeButton = document.createElement("button");
  closeButton.textContent = "close";
  closeButton.id = "c-snackbar-icon";
  closeButton.className = "c-iconbtn";
  closeButton.onclick = function () {
    snackbar.setAttribute("visible", "false");
    setTimeout(function () {
      snackbar.remove();
      var index = snackbars.indexOf(snackbar);
      if (index !== -1) {
        snackbars.splice(index, 1);
        updateSnackbarPositions();
      }
    }, 600);
  };

  snackbar.appendChild(p);
  snackbar.appendChild(closeButton);
  document.body.appendChild(snackbar);

  setTimeout(() => {
    snackbar.setAttribute("visible", "true");
  }, 0);

  snackbars.push(snackbar);
  updateSnackbarPositions();

  setTimeout(() => {
    snackbar.setAttribute("visible", "false");
    snackbar.addEventListener("transitionend", () => {
      if (snackbar.getAttribute("visible") === "false") {
        snackbar.remove();
        var index = snackbars.indexOf(snackbar);
        if (index !== -1) {
          snackbars.splice(index, 1);
          updateSnackbarPositions();
        }
      }
    });
  }, 5000);
}

/**
 * 更新提示条位置
 */
function updateSnackbarPositions() {
  var bottomValue = window.innerWidth >= 768 ? 10 : 90;

  for (var i = snackbars.length - 1; i >= 0; i--) {
    var snackbar = snackbars[i];
    snackbar.style.bottom = bottomValue + "px";

    bottomValue += snackbar.offsetHeight + 10;
  }
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

  randomRotationBullet();

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
    removeLoadScreen();

    if (palette_HEX) {
      generateColorPalette(argbFromHex(palette_HEX));
    }
  }, 500);
};

window.onpageshow = () => {
  navigation_Container.setAttribute("spec", window.innerWidth <= 648 ? "bar" : "rail");

  try {
    const activatedSegment = document.querySelector(`a[href="${theme_CurrentPage}"]`);
    const inactiveSegment = activatedSegment.querySelector(".c-navigation-segment-inactive");
    inactiveSegment.className = "c-navigation-segment-active";
  } catch (err) {
    document.querySelector("#c-navigation-destinations > div").className = "c-navigation-segment-active";
  }

  theme_ScrollToTop.forEach((element) => element.addEventListener("click", () => content_Flow.scrollTo({ top: 0 })));
  theme_RippleElements.forEach(effect_ripple);
  content_Flow.onscroll = bodyScroll;
  window.onresize = handleResize;

  initModal();

  search_ContainerController.forEach((element) => element.addEventListener("click", () => toggleAttr(theme_Root, "o-showsearch")));

  if (navigation_Drawer) {
    let enterTimeout;
    navigation_Controller.addEventListener("pointerenter", () => {
      enterTimeout = setTimeout(() => {
        toggleAttr(navigation_Drawer, "show");
      }, 500);
    });
    navigation_Controller.addEventListener("pointerleave", () => {
      clearTimeout(enterTimeout);
    });

    navigation_Controller_Button.forEach((element) => {
      element.addEventListener("click", () => {
        toggleAttr(navigation_Drawer, "show");
      });
    });

    navigation_Drawer_H1Entries.forEach((element) => {
      element.addEventListener("click", () => {
        const parentDetails = element.closest("details");
        if (parentDetails) {
          parentDetails.open = !parentDetails.open;
        }
      });
    });
    navigation_Drawer_H2Entries.forEach((element) => element.addEventListener("click", () => toggleAttr(navigation_Drawer, "show", false)));
    document.addEventListener("click", (event) => {
      const isJTM_C_NavigationDrawer = event.target.closest("#c-navigation-drawer");
      const isJTM_C_AppBar = event.target.closest(".c-appbar");
      const isMAB = event.target.closest("#c-navigation-fab");
      if (!isJTM_C_NavigationDrawer && (window.matchMedia("(max-width: 648px)").matches ? !isJTM_C_AppBar : !isMAB)) {
        toggleAttr(navigation_Drawer, "show", false);
      }
    });
  }

  theme_DelayRedirect.forEach(handleLinkDelayRedirection);

  if (carousel_Container && carousel_PostList && carousel_Controller.length === 2) {
    var currentValue = 1;
    carousel_PostList.setAttribute("data-scroll", currentValue);

    function updateValue(direction) {
      currentValue += direction;
      if (currentValue > 3) {
        currentValue = 1;
      } else if (currentValue < 1) {
        currentValue = 3;
      }
      carousel_PostList.setAttribute("data-scroll", currentValue);
    }

    carousel_Controller[0].addEventListener("click", function () {
      updateValue(-1);
    });

    carousel_Controller[1].addEventListener("click", function () {
      updateValue(1);
    });

    carousel_PostList.addEventListener("wheel", function (event) {
      event.preventDefault();
      updateValue(event.deltaY > 0 ? 1 : -1);
    });

    window.addEventListener(
      "wheel",
      function (event) {
        if (event.target === carousel_PostList) {
          event.preventDefault();
        }
      },
      { passive: false }
    );
  }
};
