function isLoaded() {
  try {
    var currentPage = window.location.pathname;
    var activatedSegment = document.querySelector("a[href='" + currentPage + "']");
    activatedSegment.querySelector("#segment-inactive").id = "segment-active";
  } catch (err) {
    document.querySelector("a[href='/posts']").querySelector("#segment-inactive").id = "segment-active";
  }
  window.addEventListener("scroll", isScroll);
  window.addEventListener("resize", isResize);

  const rippleElements = document.querySelectorAll(
    ".mib, .mcd-header > span, .menu-and-fab span, .mcd a, #accent, button, .mbt, .mfb, .mcp, .mcd[spec='focus'], .mtb span, input[type='checkbox'], input[type='radio']"
  );

  const scrollTopEl = document.querySelectorAll("#scrolltotop, #totop");

  scrollTopEl.forEach((e) => {
    e.addEventListener("click", function () {
      var scrollAction = null;
      cancelAnimationFrame(scrollAction);
      scrollAction = requestAnimationFrame(function fn() {
        var currentYpos = document.body.scrollTop || document.documentElement.scrollTop;
        if (currentYpos > 0) {
          document.body.scrollTop = document.documentElement.scrollTop = currentYpos - 100;
          scrollAction = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(scrollAction);
        }
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
    var header = document.getElementById("content-header");
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var topAppBar = document.querySelector(".mtb");
    var topButton = document.getElementById("scrolltotop");

    if (scrollY >= 64) {
      topAppBar.setAttribute("on-scroll", "");
    } else {
      topAppBar.removeAttribute("on-scroll", "");
    }

    switch (true) {
      case scrollY >= 400:
        header.style.opacity = "0";
        topButton.style.cssText = "opacity: 1; visibility: visible; animation: 0.6s cubic-bezier(0.4, 1, 0.6, 0.6) pop-out";
        break;
      default:
        header.style.opacity = "1";
        topButton.style.cssText = "opacity: 0; visibility: hidden";
    }
  }

  function isResize() {
    var navBar = document.querySelector(".mnb");
    var navRail = document.querySelector(".mnr");
    var topAppBar = document.querySelector(".mtb");

    try {
      if (window.innerWidth > 768) {
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
