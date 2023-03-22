function isPageShow() {
  const currentPage = window.location.pathname;
  const activatedSegment = document.querySelector(`a[href="${currentPage}"]`);
  const inactiveSegment = activatedSegment.querySelector("#segment-inactive");

  try {
    inactiveSegment.id = "segment-active";
  } catch (error) {
    document.querySelector(`a[href="/posts"] #segment-inactive`).id = "segment-active";
  }

  window.addEventListener("scroll", isScroll);
  window.addEventListener("resize", isResize);

  const rippleElements = document.querySelectorAll(
    ".mib, .mcd-header > span, .menu-and-fab span, .mcd a, #accent, button, .mbt, .mfb, .mcp, .mcd[spec='focus'], .mtb span, input[type='checkbox'], input[type='radio']"
  );

  const scrollTopEl = document.querySelectorAll("#scrolltotop, #totop");

  scrollTopEl.forEach((e) => {
    e.addEventListener("click", function () {
      window.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    });
  });

  rippleElements.forEach((btn) => {
    btn.addEventListener("mousedown", function (e) {
      let x = e.offsetX;
      let y = e.offsetY;
      let d = Math.max(btn.clientWidth, btn.clientHeight);

      this.classList.add("ripple-effect");
      this.style.setProperty("--x", x);
      this.style.setProperty("--y", y);
      this.style.setProperty("--d", d);

      setTimeout(() => {
        this.classList.remove("ripple-effect");
      }, 500);
    });
  });

  function isScroll() {
    const header = document.querySelector("#content-header");
    const scrollY = window.scrollY;
    const topAppBar = document.querySelector(".mtb");
    const topButton = document.querySelector("#scrolltotop");

    topAppBar.setAttribute("on-scroll", scrollY >= 64 ? "true" : "false");

    header.style.opacity = scrollY >= 400 ? "0" : "1";
    topButton.style.cssText = `
      opacity: ${scrollY >= 400 ? "1" : "0"};
      visibility: ${scrollY >= 400 ? "visible" : "hidden"};
      animation: ${scrollY >= 400 ? "0.6s cubic-bezier(0.4, 1, 0.6, 0.6) popOut" : ""}
    `;
  }

  function isResize() {
    var navBar = document.querySelector(".mnb");
    var navRail = document.querySelector(".mnr");
    var topAppBar = document.querySelector(".mtb");

    try {
      if (window.matchMedia("(min-width: 768px)").matches) {
        topAppBar.style.visibility = "hidden";
        navBar.classList.replace("mnb", "mnr");
      } else {
        topAppBar.style.visibility = "visible";
        navRail.classList.replace("mnr", "mnb");
      }
    } catch (err) {
      return null;
    }
  }
}

function isLoad() {
  const splashScreen = document.querySelector(".content-loading");
  const mainContent = document.querySelector(".content-grid");

  splashScreen.style.animation = "forwards fadeOut 0.4s";

  splashScreen.addEventListener("animationend", function () {
    this.style.display = "none";
    mainContent.style.overflow = "initial";
  });
}
