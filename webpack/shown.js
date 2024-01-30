import { ripple } from "./_components/ripple";
import {
  carouselControl,
  carouselElement,
  carouselPostList,
  contentContainer,
  contentDrawerH1Entries,
  contentDrawerH2Entries,
  contentDrawerMenuBtn,
  contentNavigation,
  contentNavigationDrawer,
  currentPage,
  handleLinkDelayRedirection,
  handleResize,
  handleScroll,
  initModal,
  linkElements,
  rippleElements,
  scrollTopElements,
  toggleNavigationDrawer,
} from "./app";

window.onpageshow = () => {
  contentNavigation.setAttribute("spec", window.innerWidth <= 648 ? "bar" : "rail");

  try {
    const activatedSegment = document.querySelector(`a[href="${currentPage}"]`);
    const inactiveSegment = activatedSegment.querySelector("#JTM-C-Navigation-SegmentInactive");
    inactiveSegment.id = "JTM-C-Navigation-SegmentActive";
  } catch (err) {
    document.querySelector(`a[href="/posts/"] #JTM-C-Navigation-SegmentInactive`).id = "JTM-C-Navigation-SegmentActive";
  }

  scrollTopElements.forEach((element) => element.addEventListener("click", () => contentContainer.scrollTo({ top: 0 })));
  rippleElements.forEach(ripple);
  contentContainer.onscroll = handleScroll;
  window.onresize = handleResize;

  if (contentNavigationDrawer) {
    contentDrawerMenuBtn.forEach((element) => element.addEventListener("click", () => toggleNavigationDrawer()));
    contentDrawerH1Entries.forEach((element) => {
      element.addEventListener("click", () => {
        const parentDetails = element.closest("details");
        if (parentDetails) {
          parentDetails.open = !parentDetails.open;
        }
      });
    });
    contentDrawerH2Entries.forEach((element) => element.addEventListener("click", () => toggleNavigationDrawer(false)));
    document.addEventListener("click", (event) => {
      const isJTM_C_NavigationDrawer = event.target.closest(".JTM-C-NavigationDrawer");
      const isJTM_C_AppBar = event.target.closest(".JTM-C-AppBar");
      const isMAB = event.target.closest("#JTM-C-Navigation-FAB");
      if (!isJTM_C_NavigationDrawer && (window.matchMedia("(max-width: 648px)").matches ? !isJTM_C_AppBar : !isMAB)) {
        toggleNavigationDrawer(false);
      }
    });
  }

  initModal();

  linkElements.forEach(handleLinkDelayRedirection);

  if (carouselElement && carouselPostList && carouselControl.length === 2) {
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

    carouselControl[0].addEventListener("click", function () {
      updateValue(-1);
    });

    carouselControl[1].addEventListener("click", function () {
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
