import {
  contentNavigation,
  currentPage,
  scrollTopElements,
  contentContainer,
  rippleElements,
  handleScroll,
  handleResize,
  contentNavigationDrawer,
  contentDrawerMenuBtn,
  toggleNavigationDrawer,
  contentDrawerEntries,
  initModal,
  websiteInfomation,
  linkElements,
  handleLinkDelayRedirection,
  carouselPostList,
  carouselControl,
  carouselElement,
} from "./app";
import { ripple } from "./_components/ripple";

window.onpageshow = () => {
  contentNavigation.setAttribute("spec", window.innerWidth <= 768 ? "bar" : "rail");

  try {
    const activatedSegment = document.querySelector(`a[href="${currentPage}"]`);
    const inactiveSegment = activatedSegment.querySelector("#JTM-C-Navigation-SegmentInactive");
    inactiveSegment.id = "JTM-C-Navigation-SegmentActive";
  } catch (err) {
    document.querySelector(`a[href="/posts"] #JTM-C-Navigation-SegmentInactive`).id = "JTM-C-Navigation-SegmentActive";
  }

  scrollTopElements.forEach((element) => element.addEventListener("click", () => contentContainer.scrollTo({ top: 0 })));
  rippleElements.forEach(ripple);
  contentContainer.onscroll = handleScroll;
  window.onresize = handleResize;

  if (contentNavigationDrawer) {
    contentDrawerMenuBtn.forEach((element) => element.addEventListener("click", () => toggleNavigationDrawer()));
    contentDrawerEntries.forEach((element) => element.addEventListener("click", () => toggleNavigationDrawer(false)));
    document.addEventListener("click", (event) => {
      const isJTM_C_NavigationDrawer = event.target.closest(".JTM-C-NavigationDrawer");
      const isJTM_C_AppBar = event.target.closest(".JTM-C-AppBar");
      const isMAB = event.target.closest("#JTM-C-Navigation-FAB");
      if (!isJTM_C_NavigationDrawer && (window.matchMedia("(max-width: 768px)").matches ? !isJTM_C_AppBar : !isMAB)) {
        toggleNavigationDrawer(false);
      }
    });
  }

  initModal();

  if (websiteInfomation) {
    const websiteInfomationWidth = websiteInfomation.clientWidth;
    websiteInfomation.style.width = websiteInfomationWidth + "px";
  }

  linkElements.forEach(handleLinkDelayRedirection);

  if (carouselElement) {
    var currentValue = 0;

    function updateValue(newValue) {
      currentValue = (newValue + 3) % 3;
      carouselPostList.setAttribute("data-scroll", currentValue);
    }

    carouselControl[0].addEventListener("click", function () {
      updateValue(currentValue - 1);
    });

    carouselControl[1].addEventListener("click", function () {
      updateValue(currentValue + 1);
    });

    carouselPostList.addEventListener("wheel", function (event) {
      event.preventDefault();
      updateValue(currentValue + (event.deltaY > 0 ? 1 : -1));
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
