$(document).ready(function () {
  $(".toggle-btn").click(function () {
    $(".toggle-item").slideToggle(200);
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".btn-menu").css({
        right: "2em",
        bottom: "2em",
        opacity: "0.5",
        width: "5%",
        transform: "scale3d(1.2, 1.2, 1)",
      });
    } else {
      $(".btn-menu").css({
        right: "0",
        bottom: "0",
        opacity: "1",
        width: "100%",
        transform: "scale3d(1, 1, 1)",
      });
    }
  });
});

var ani_warn = {
  container: document.getElementById("warn"),
  path: "assets/animations/warn.json",
  renderer: "svg",
  loop: false,
  autoplay: true,
};

var ani_errcode = {
  container: document.getElementById("errcode"),
  path: "assets/animations/404.json",
  renderer: "svg",
  loop: false,
  autoplay: true,
};

var ani_aincrad = {
  container: document.getElementById("aincrad"),
  path: "assets/animations/aincrad.json",
  renderer: "svg",
  loop: false,
  autoplay: true,
};

lottie.loadAnimation(ani_warn);
lottie.loadAnimation(ani_errcode);
lottie.loadAnimation(ani_aincrad);
