window.addEventListener("scroll", isScroll);
window.addEventListener("resize", isResize);

var scrollAction = null;
document.getElementById("scrolltotop").onclick = function () {
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
};

function isScroll() {
  var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
  var header = document.getElementById("content-header");
  var topButton = document.getElementById("scrolltotop");

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

function isLoaded() {
  try {
    var currentPage = window.location.pathname;
    var activatedSegment = document.querySelector("a[href='" + currentPage + "']");
    activatedSegment.querySelector("#segment-inactive").id = "segment-active";
  } catch (err) {
    document.querySelector("a[href='/posts']").querySelector("#segment-inactive").id = "segment-active";
  }
}

function isResize() {
  try {
    if (window.innerWidth > 768) {
      document.querySelector(".material-navigation-bar").className = "material-navigation-rail";
    } else {
      document.querySelector(".material-navigation-rail").className = "material-navigation-bar";
    }
  } catch (err) {
    return null;
  }
}
