import "./shown";
import "./loaded";
import { openModal, closeModal } from "./_components/modal";

////////////////////
//常用常量配置
///////////////////
/**
 * 需要被取色的图片
 */
export const themeImageProvider = new Image();
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
export const contentPhotograph = document.querySelector("#JTM-S-Title-Impression img");
/**
 * 页面导航
 */
export const contentNavigation = document.querySelector(".JTM-C-Navigation");
/**
 * 展开的页面导航
 */
export const contentNavigationDrawer = document.querySelector(".JTM-C-NavigationDrawer");
/**
 * 页面导航的目录元素
 */
export const contentDrawerEntries = contentNavigationDrawer ? contentNavigationDrawer.querySelectorAll(".JTM-C-NavigationDrawer-Entry") : [];
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
export const modalTips = document.querySelector("#JTM-C-Dialog-ModalTips");
/**
 * 选择可以开启模态提示框的元素
 */
const modalTipsIcon = document.querySelectorAll(".JTM-S-WebsiteInformation, #JTM-C-AppBar-InfoIcon");
/**
 * 选择可以关闭模态提示框的元素
 */
const dialogBtnClose = document.querySelector("#dialog-close");
/**
 * 选择点击后跳转到页面顶端的元素
 */
export const scrollTopElements = document.querySelectorAll(".JTM-S-CornerFAB");
/**
 * 选择需要涟漪效果的元素
 */
export const rippleElements = document.querySelectorAll(
  `button, .JTM-C-Card[spec='clear'], .JTM-C-Card[spec='focus'], .JTM-C-NavigationDrawer a, #JTM-C-Navigation-DestinationAccent, .JTM-S-WebsiteInformation, .JTM-S-Carousel-PostItem`
);
/**
 * 选择页面右上角的网站信息
 */
export const websiteInfomation = document.querySelector(".JTM-S-WebsiteInformation");
/**
 * 选择所有a元素
 */
export const linkElements = document.querySelectorAll(
  "#JTM-S-Carousel-PostsList a, #JTM-C-Navigation-Destinations a, #JTM-P-Index-Timeline-PostCard a, #JTM-S-UniversalLayout-ContentFlow > div.JTM-S-QuickJump a"
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
  themeRoot.toggleAttribute("JTM-O-ContentBlur", state);
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
      animation: ${scrollY >= 400 ? "popOut var(--md-sys-motion-duration-long2) cubic-bezier(0.4, 1, 0.6, 0.6)" : ""}
    `;
  });
  lastScrollY = scrollY;
};

/**
 * 缩放事件
 */
export const handleResize = () => {
  contentNavigation.setAttribute("spec", window.innerWidth <= 768 ? "bar" : "rail");
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

export const initModal = () => {
  modalTipsIcon.forEach((element) => element.addEventListener("click", openModal));
  dialogBtnClose.addEventListener("click", closeModal);
  modalTips.addEventListener("keydown", handleKeyboardEvent);
  modalTips.addEventListener("click", handleClickOutside);
};

export const removeLoadScreen = () => {
  const delay = 450;
  themeRoot.setAttribute("JTM-O-OnSiteLoaded", true);
  setTimeout(() => {
    contentSplashScreen.style.display = "none";
  }, delay);
};

export const addLoadScreen = () => {
  themeRoot.removeAttribute("JTM-O-OnSiteLoaded");
};
