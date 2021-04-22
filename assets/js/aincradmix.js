//杂烩一锅粥
$(document).ready(function () {
  $(".float-btn").click(function () {
    $(".float-index-bg").fadeToggle(500);
  });
});

var animation = lottie.loadAnimation({
  container: document.getElementById("warn"),
  path: "assets/animations/warn.json",
  renderer: "svg",
  loop: false,
  autoplay: true,
});

VanillaTilt.init(document.querySelector(".float-index-content"), {
  reverse: true,
  max: 10,
  scale: 1.05,
  axis: "y",
  gyroscope: false,
});

VanillaTilt.init(document.querySelectorAll(".item-about"), {
  reverse: true,
  max: 10,
  scale: 1.05,
  axis: "xy",
  glare: true,
  "max-glare": 0.3,
  gyroscope: true,
});

anime({
  targets: ".float-index-btn1",
  duration: 200,
  top: "45px",
  right: "45px",
  opacity: 1,
  rotate: 45,
});

//let topbar = document.getElementById("bar")
//window.addEventListener("scroll", function(){
//  let value = window.scrollY;
//  topbar.style.opacity = value + 0.1;
//})