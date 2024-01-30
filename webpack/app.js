import "./shown";
import "./loaded";
import { openModal, closeModal } from "./_components/modal";

////////////////////
//常用常量配置
///////////////////
/**
 * 需要以此生成调色盘的hex颜色
 */
export const customThemeColor = document.body.getAttribute("color");
/**
 * 主题根节点
 */
export const themeRoot = document.querySelector(".JTM-Root");
/**
 * 文章内容流
 */
export const contentContainer = document.querySelector("#JTM-S-UniversalLayout-ContentFlow");
/**
 * 文章头部印象图
 */
export const contentPhotograph = document.querySelector("#JTM-S-Header-Impression img");
/**
 * 页面导航
 */
export const contentNavigation = document.querySelector(".JTM-C-Navigation");
/**
 * 展开的页面导航
 */
export const contentNavigationDrawer = document.querySelector(".JTM-C-NavigationDrawer");
/**
 * 页面导航的一级目录元素
 */
export const contentDrawerH1Entries = contentNavigationDrawer ? contentNavigationDrawer.querySelectorAll("details summary > a") : [];
/**
 * 页面导航的二级目录元素
 */
export const contentDrawerH2Entries = contentNavigationDrawer ? contentNavigationDrawer.querySelectorAll("details > a") : [];
/**
 * 选择控制页面导航开关的元素
 */
export const contentDrawerMenuBtn = contentNavigationDrawer
  ? document.querySelectorAll("#JTM-C-Navigation-FAB > button, #JTM-C-AppBar-MenuIcon, #JTM-C-NavigationDrawer-MenuCloseIcon")
  : [];
/**
 * 页面加载中的闪屏
 */
const contentSplashScreen = document.querySelector(".JTM-S-LoadingSplash");
/**
 * 定位当前所在的页面
 */
export const currentPage = window.location.pathname;
/**
 * 选择移动端的标题栏
 */
const topAppBar = document.querySelector(".JTM-C-AppBar");
/**
 * 选择模态提示框
 */
export const modalTips = document.querySelector(".JTM-C-Dialog");
/**
 * 选择可以开启模态提示框的元素
 */
const modalTipsIcon = document.querySelectorAll("#JTM-S-WebsiteInformation, #JTM-C-AppBar-InfoIcon");
/**
 * 选择可以关闭模态提示框的元素
 */
const dialogBtnClose = document.querySelector("#dialog-close");
/**
 * 选择点击后跳转到页面顶端的元素
 */
export const scrollTopElements = document.querySelectorAll(".JTM-S-ScrollToTop");
/**
 * 选择需要涟漪效果的元素
 */
export const rippleElements = document.querySelectorAll(
  `#JTM-S-UniversalLayout-ContentFiller[spec='article'] li a, #JTM-S-UniversalLayout-ContentFiller[spec='article'] p a, button, .JTM-C-Card[spec='clear'], .JTM-C-Card[spec='focus'], .JTM-C-NavigationDrawer a, #JTM-C-Navigation-DestinationAccent, .JTM-S-WebsiteInformation, .JTM-S-Carousel-PostItem`
);
/**
 * 选择需要延迟跳转的a元素
 */
export const linkElements = document.querySelectorAll(
  ".JTM-P-Index-Card, .JTM-S-Carousel-PostItem, #JTM-C-Navigation-Destinations a, #JTM-P-Posts-Timeline-PostCard a, .JTM-S-QuickJump"
);
/**
 * Carousel元素
 */
export const carouselElement = document.querySelector(".JTM-S-Carousel");
/**
 * Carousel的控制按钮
 */
export const carouselControl = carouselElement ? carouselElement.querySelectorAll(".JTM-S-Carousel-Control") : [];
/**
 * Carousel的文章列表
 */
export const carouselPostList = carouselElement ? carouselElement.querySelector("#JTM-S-Carousel-PostsList") : [];
/**
 * 需要随机旋转的列表Bullet
 */
export const rotationListItemsBullet = document.querySelectorAll("ul li");
////////////////////
//常用常量配置结束
///////////////////

/**
 * 控制元素的状态
 * @contentNavigationDrawer show
 * @themeRoot JTM-O-ContentBlur
 * @param {boolean} state
 */
export const toggleNavigationDrawer = (state) => {
  contentNavigationDrawer.toggleAttribute("show", state);
};
/**
 * 控制根元素的状态
 * @param {boolean} state
 */
export const toggleDim = (state) => themeRoot.toggleAttribute("JTM-O-BodyBlur", state);

let lastScrollY = 0;
/**
 * 滚动事件
 */
export const handleScroll = () => {
  const scrollY = contentContainer.scrollTop;
  const scrollThreshold = 64;
  const scrollDirection = scrollY > lastScrollY ? "down" : "up";
  topAppBar.setAttribute("scroll", scrollY >= scrollThreshold ? "true" : "false");
  if (scrollDirection === "up") {
    themeRoot.setAttribute("JTM-O-OnScrollEvent", "false");
  } else if (scrollDirection === "down" && scrollY >= 500) {
    themeRoot.setAttribute("JTM-O-OnScrollEvent", "true");
  }
  scrollTopElements.forEach((element) => {
    element.style.cssText = `
      opacity: ${scrollY >= 400 ? "1" : "0"};
      visibility: ${scrollY >= 400 ? "visible" : "hidden"};
    `;
  });
  lastScrollY = scrollY;
};

/**
 * 缩放事件
 */
export const handleResize = () => {
  contentNavigation.setAttribute("spec", window.innerWidth <= 648 ? "bar" : "rail");
};

/**
 * 链接跳转事件
 * @param {selector} link
 */
export const handleLinkDelayRedirection = (link) => {
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
};

/**
 * 初始化模态提示框
 */
export const initModal = () => {
  const handleKeyboardEvent = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
    }
  };

  const handleClickOutside = (event) => {
    if (event.target === modalTips) {
      closeModal();
    }
  };

  modalTipsIcon.forEach((element) => element.addEventListener("click", openModal));
  dialogBtnClose.addEventListener("click", closeModal);
  modalTips.addEventListener("keydown", handleKeyboardEvent);
  modalTips.addEventListener("click", handleClickOutside);
};

/**
 * 移除加载屏幕
 */
export const removeLoadScreen = () => {
  const delay = 450;
  themeRoot.setAttribute("JTM-O-OnSiteLoaded", true);
  setTimeout(() => {
    contentSplashScreen.style.display = "none";
  }, delay);
};

/**
 * 增加加载屏幕
 */
export const addLoadScreen = () => {
  themeRoot.removeAttribute("JTM-O-OnSiteLoaded");
};

/**
 * 随机旋转列表的Bullet
 */
export const randomRotationBullet = () => {
  const style = document.createElement("style");
  document.head.appendChild(style);

  rotationListItemsBullet.forEach((li, index) => {
    const randomRotation = Math.floor(Math.random() * 360);
    style.sheet.insertRule(`ul li:nth-child(${index + 1})::before { transform: rotate(${randomRotation}deg); }`, style.sheet.cssRules.length);
  });
};

var snackbars = [];
/**
 * 创建一个底部提示条
 * @param {*} content
 */
export function createSnackbar(content) {
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
export function updateSnackbarPositions() {
  var bottomValue = window.innerWidth >= 768 ? 10 : 90;

  for (var i = snackbars.length - 1; i >= 0; i--) {
    var snackbar = snackbars[i];
    snackbar.style.bottom = bottomValue + "px";

    bottomValue += snackbar.offsetHeight + 10;
  }
}
