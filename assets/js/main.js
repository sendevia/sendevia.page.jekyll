window.addEventListener("scroll", isScroll);

function isScroll() {
  var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
  var header = document.querySelector(".content-header");
  if (scrollY >= 400) {
    header.style.opacity = "0";
  } else {
    header.style.opacity = "1";
  }
}
