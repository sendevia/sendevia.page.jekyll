//杂烩一锅粥
$(document).ready(function () {
  $(".float-btn").click(function () {
    $(".float-index-bg").fadeToggle(200);
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

VanillaTilt.init(document.querySelectorAll(".acrylic-w"), {
  reverse: true,
  max: 5,
  scale: 0.98,
  speed: 1000,
  axis: "xy",
});

VanillaTilt.init(document.querySelectorAll(".acrylic-b"), {
  reverse: true,
  max: 5,
  scale: 0.98,
  speed: 1000,
  axis: "xy",
});
