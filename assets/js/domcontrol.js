window.onpageshow = function () {
  // 页面指示
  try {
    const currentPage = window.location.pathname;
    const activatedSegment = document.querySelector(`a[href="${currentPage}"]`);
    const inactiveSegment = activatedSegment.querySelector("#segment-inactive");
    inactiveSegment.id = "segment-active";
  } catch (error) {
    document.querySelector(`a[href="/posts"] #segment-inactive`).id = "segment-active";
  }

  // 滚动到页面顶部
  const scrollTopElDesktop = document.querySelector("#rcf-mfb-topbutton");

  function scrollToTop() {
    document.querySelector(".content-container").scrollTo({
      top: 0,
    });
  }

  scrollTopElDesktop.addEventListener("click", () => {
    scrollToTop();
  });

  // 涟漪效果
  const rippleElements = document.querySelectorAll(
    ".mnd a, .mib, .mcd-header > span, .menu-and-fab span, .mcd a, #accent, button, .mbt, .mfb, .mcp, .mcd[spec='focus'], .mtb span, input[type='checkbox'], input[type='radio']"
  );

  rippleElements.forEach((btn) => {
    btn.addEventListener("mousedown", (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      const d = Math.max(btn.clientWidth, btn.clientHeight);

      btn.classList.add("ripple-effect");
      btn.style.setProperty("--x", x);
      btn.style.setProperty("--y", y);
      btn.style.setProperty("--d", d);
    });
    btn.addEventListener("animationend", () => {
      btn.classList.remove("ripple-effect");
    });
  });

  // 滚动事件
  document.querySelector(".content-container").onscroll = function () {
    const clientHeight = this.clientHeight;
    const header = document.querySelector("#content-header");
    const progressEl = document.querySelector("#reading-progress");
    const scrollHeight = this.scrollHeight;
    const scrollY = this.scrollTop;
    const scrollTop = document.documentElement.scrollTop || scrollY;
    const topAppBar = document.querySelector(".mtb");
    const topButton = document.querySelector("#rcf-mfb-topbutton");

    topAppBar.setAttribute("scroll", scrollY >= 64 ? "true" : "false");

    header.style.opacity = scrollY >= 400 ? "0" : "1";
    topButton.style.cssText = `
      opacity: ${scrollY >= 400 ? "1" : "0"};
      visibility: ${scrollY >= 400 ? "visible" : "hidden"};
      animation: ${scrollY >= 400 ? "popOut 0.6s cubic-bezier(0.4, 1, 0.6, 0.6)" : ""}
    `;

    // 阅读进度
    const readPercent = (scrollTop / (scrollHeight - clientHeight)).toFixed(2) * 100;

    progressEl.style.width = readPercent + "%";
  };

  // 缩放事件
  window.onresize = function () {
    const navBar = document.querySelector(".mnb");
    const navRail = document.querySelector(".mnr");

    changeHeaderTransform();

    try {
      if (window.innerWidth > 768) {
        navBar.classList.replace("mnb", "mnr");
      } else {
        navRail.classList.replace("mnr", "mnb");
      }
    } catch (err) {
      return null;
    }
  };

  // 侧边栏
  const mainContent = document.querySelector(".content-container");
  const mndSection = document.querySelector(".mnd");
  const mndEntries = mndSection.querySelectorAll(".mnd-entry");
  const mnbMenuBtn = document.querySelectorAll(".menu-and-fab > .mib, .mtb > #mtb-mib-menu");

  const toggleMndSection = (boolean) => {
    mndSection.toggleAttribute("show", boolean);
    mainContent.toggleAttribute("compress", boolean);
  };

  mnbMenuBtn.forEach((i) => {
    i.addEventListener("click", () => {
      toggleMndSection();
    });
  });

  mndEntries.forEach((i) => {
    i.addEventListener("click", () => {
      toggleMndSection(false);
      changeHeaderTransform();
    });
  });

  document.addEventListener("click", (e) => {
    const isMnd = e.target.closest(".mnd");
    const isMtb = e.target.closest(".mtb");
    const isMAB = e.target.closest(".menu-and-fab");
    changeHeaderTransform();

    if (!isMnd && (window.matchMedia("(max-width: 768px)").matches ? !isMtb : !isMAB)) {
      toggleMndSection(false);
    }
  });
};

window.onload = function () {
  removeLoadScreen();
  changeHeaderTransform();

  // 监听颜色主题更改
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", () => {
    location.reload();
  });
};

function changeHeaderTransform() {
  const isImageSource = document.querySelector("#header_image");
  const isContainerOffset = document.querySelector("#content-header").offsetHeight;
  const isImageOffset = isImageSource.offsetHeight;

  isImageSource.style.setProperty("--via-transform-header-image", Math.abs(isImageOffset - isContainerOffset));
}

function removeLoadScreen() {
  const splashScreen = document.querySelector(".content-loading");
  const mainContent = document.querySelector(".content-container");

  splashScreen.style.animation = "fadeOut 0.4s forwards";

  splashScreen.addEventListener("animationend", () => {
    splashScreen.style.display = "none";
    mainContent.style.overflow = "overlay";
  });
}
