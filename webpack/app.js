import { argbFromHex } from "@material/material-color-utilities";
import { generateColorPalette } from "./_components/monet";
import { effect_ripple } from "./_components/ripple";

/**
 * 主题 - 根节点
 */
const theme_Root = document.querySelector(".JTM-Root");
/**
 * 主题 - 加载指示器
 */
const theme_LoadingIndicator = document.querySelector(".JTM-S-LoadingSplash");
/**
 * 主题 - 定位当前所在页面
 */
const theme_CurrentPage = window.location.pathname;
/**
 * 主题 - 模态对话框
 */
const theme_Dialog = document.querySelector(".JTM-C-Dialog");
/**
 * 主题 - 模态对话框 - 状态控制器（开启）
 */
const theme_Dialog_Controller_Open = document.querySelectorAll("#JTM-S-WebsiteInformation, #JTM-C-AppBar-InfoIcon");
/**
 * 主题 - 模态对话框 - 状态控制器（关闭）
 */
const theme_Dialog_Controller_Close = document.querySelector("#dialog-close");
/**
 * 主题 - 跳转到页首
 */
const theme_ScrollToTop = document.querySelectorAll(".JTM-S-ScrollToTop");
/**
 * 主题 - 涟漪效果元素
 */
const theme_RippleElements = document.querySelectorAll(
  `#JTM-S-UniversalLayout-ContentFiller[spec='article'] li a, #JTM-S-UniversalLayout-ContentFiller[spec='article'] p a, button, .JTM-C-Card[spec='clear'], .JTM-C-Card[spec='focus'], .JTM-C-NavigationDrawer a, #JTM-C-Navigation-DestinationAccent, .JTM-S-WebsiteInformation, .JTM-S-Carousel-PostItem`
);
/**
 * 主题 - 延迟跳转元素
 */
const theme_DelayRedirect = document.querySelectorAll(
  "#JTM-P-Index-ReadMore, .JTM-P-Index-Card, .JTM-S-Carousel-PostItem, #JTM-C-Navigation-Destinations a, #JTM-P-Posts-Timeline-PostCard a, .JTM-S-QuickJump"
);
/**
 * 调色盘 - HEX颜色
 */
const palette_HEX = document.body.getAttribute("color");
/**
 * 文章 - 内容流
 */
const content_Flow = document.querySelector("#JTM-S-UniversalLayout-ContentFlow");
/**
 * 文章 - 头部印象图
 */
const content_Photograph = document.querySelector("#JTM-S-Header-Impression img");
/**
 * 文章 - ul随机旋转的marker
 */
const content_RotationListItemsBullet = document.querySelectorAll("ul li");
/**
 * 全局导航栏
 */
const navigation_Container = document.querySelector(".JTM-C-Navigation");
/**
 * 全局导航栏 - 展开
 */
const navigation_Drawer = document.querySelector(".JTM-C-NavigationDrawer");
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
const navigation_Controller = navigation_Drawer
  ? document.querySelectorAll("#JTM-C-Navigation-FAB > button, #JTM-C-AppBar-MenuIcon, #JTM-C-NavigationDrawer-MenuCloseIcon")
  : [];
/**
 * 移动端 - 标题栏
 */
const mobile_AppBar = document.querySelector(".JTM-C-AppBar");
/**
 * Carousel - 内容容器
 */
const carousel_Container = document.querySelector(".JTM-S-Carousel");
/**
 * Carousel - 状态控制器
 */
const carousel_Controller = carousel_Container ? carousel_Container.querySelectorAll(".JTM-S-Carousel-Control") : [];
/**
 * Carousel - 展示的文章
 */
const carousel_PostList = carousel_Container ? carousel_Container.querySelector("#JTM-S-Carousel-PostsList") : [];

/**
 * 控制全局导航栏的展开状态
 */
function toggle_Navigation_Drawer(boolean) {
  navigation_Drawer.toggleAttribute("show", boolean);
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
    theme_Root.setAttribute("JTM-O-OnScrollEvent", "false");
  } else if (scrollDirection === "down" && scrollY >= 500) {
    theme_Root.setAttribute("JTM-O-OnScrollEvent", "true");
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
    theme_Root.toggleAttribute("JTM-O-BodyBlur", boolean);
  };

  const openModal = () => {
    toggleDim();
    theme_Dialog.showModal();
  };

  const closeModal = () => {
    toggleDim(false);
    theme_Dialog.style.animation = `var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized) 1 normal both JTM-C-Dialog-ContainerClose`;
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
  theme_Root.removeAttribute("JTM-O-OnSiteLoaded");
}

/**
 * 移除加载屏幕
 */
function removeLoadScreen() {
  const delay = 450;
  theme_Root.setAttribute("JTM-O-OnSiteLoaded", true);
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
  snackbar.className = "JTM-C-Snackbar";
  snackbar.setAttribute("visible", "false");

  var p = document.createElement("p");
  p.id = "JTM-C-Snackbar-Supporting";
  p.textContent = content;

  var closeButton = document.createElement("button");
  closeButton.textContent = "close";
  closeButton.id = "JTM-C-Snackbar-Icon";
  closeButton.className = "JTM-C-IconButton";
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
  randomRotationBullet();

  document.querySelectorAll("#JTM-S-UniversalLayout-ContentFiller > h1").forEach((h1) => {
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
    const inactiveSegment = activatedSegment.querySelector("#JTM-C-Navigation-SegmentInactive");
    inactiveSegment.id = "JTM-C-Navigation-SegmentActive";
  } catch (err) {
    document.querySelector(`a[href="/posts/"] #JTM-C-Navigation-SegmentInactive`).id = "JTM-C-Navigation-SegmentActive";
  }

  theme_ScrollToTop.forEach((element) => element.addEventListener("click", () => content_Flow.scrollTo({ top: 0 })));
  theme_RippleElements.forEach(effect_ripple);
  content_Flow.onscroll = bodyScroll;
  window.onresize = handleResize;

  initModal();

  if (navigation_Drawer) {
    navigation_Controller.forEach((element) => element.addEventListener("click", () => toggle_Navigation_Drawer()));
    navigation_Drawer_H1Entries.forEach((element) => {
      element.addEventListener("click", () => {
        const parentDetails = element.closest("details");
        if (parentDetails) {
          parentDetails.open = !parentDetails.open;
        }
      });
    });
    navigation_Drawer_H2Entries.forEach((element) => element.addEventListener("click", () => toggle_Navigation_Drawer(false)));
    document.addEventListener("click", (event) => {
      const isJTM_C_NavigationDrawer = event.target.closest(".JTM-C-NavigationDrawer");
      const isJTM_C_AppBar = event.target.closest(".JTM-C-AppBar");
      const isMAB = event.target.closest("#JTM-C-Navigation-FAB");
      if (!isJTM_C_NavigationDrawer && (window.matchMedia("(max-width: 648px)").matches ? !isJTM_C_AppBar : !isMAB)) {
        toggle_Navigation_Drawer(false);
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
