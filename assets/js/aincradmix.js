$(document).ready(function () {
  $(".toggle-btn").click(function () {
    $(".toggle-item").slideToggle(200);
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".btn-menu").css({
        opacity: "0",
      });
    } else {
      $(".btn-menu").css({
        opacity: "1",
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
