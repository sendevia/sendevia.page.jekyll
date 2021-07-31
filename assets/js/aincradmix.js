$(document).ready(function () {
  $(".toggle-btn").click(function () {
    $(".toggle-item").slideToggle(200);
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
