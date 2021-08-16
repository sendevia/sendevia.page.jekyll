$(document).ready(function () {
  $(".toggle-btn").click(function () {
    $(".toggle-item").slideToggle(200);
  });
});

$(window).scroll(function () {
  if ($(this).scrollTop() > 50) {
    $(".corner-left,.corner-right").addClass("el-hide");
  } else {
    $(".corner-right").removeClass("el-hide");
  }
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
