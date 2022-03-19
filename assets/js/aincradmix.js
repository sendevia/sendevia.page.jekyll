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

var ani_download = {
  container: document.getElementById("animation_button"),
  path: "assets/animations/download.json",
  renderer: "svg",
  loop: false,
  name: "ani_delimiter",
  autoplay: false,
};

var ani_delimiter = {
  container: document.getElementById("delimiter"),
  path: "assets/animations/delimiter.json",
  renderer: "svg",
  loop: true,
  autoplay: true,
};

lottie.loadAnimation(ani_warn);
lottie.loadAnimation(ani_errcode);
lottie.loadAnimation(ani_aincrad);
lottie.loadAnimation(ani_download);
lottie.loadAnimation(ani_delimiter);

$(document).ready(function () {
  $(".toggle-btn").click(function () {
    $(".toggle-item").slideToggle(200);
  });

  $("#animation_button").hover(
    function () {
      lottie.play("ani_delimiter");
    },
    function () {
      lottie.stop("ani_delimiter");
    }
  );

  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".btn-menu").css({
        right: "2em",
        bottom: "2em",
        opacity: "0.5",
        width: "3em",
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
