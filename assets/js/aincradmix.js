//杂烩一锅粥
$(document).ready(function () {
  $(".float-btn").click(function () {
    $(".float-index-bg").fadeToggle(500);
  });
});

lottie.loadAnimation({
  container: document.getElementById("warn"),
  path: "assets/animations/warn.json",
  renderer: "svg",
  loop: false,
  autoplay: true,
});

lottie.loadAnimation({
  container: document.getElementById("errcode"),
  path: "assets/animations/404.json",
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
