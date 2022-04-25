$(document).ready(function () {
  $(".material-select-menu").click(function () {
    var isMenuClick = $(this).attr("id");
    if (isMenuClick) {
      $("#" + isMenuClick)
        .find("ul")
        .css("display", "block");
    }
  });
  // 侧边栏展开控制
  // var clickTime = 1;
  // $("#menu").click(function () {
  //   if (clickTime++ % 2 != 0) {
  //     $(".content-gird").css("grid-template-columns", "200px auto");
  //     $(".m3-navigation-rail").css("width", "200px");
  //     $("#fab").css({
  //       width: "170px",
  //       "box-shadow": "none",
  //       filter: "drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1))",
  //     });
  //   } else {
  //     $("*").removeAttr("style");
  //     let clickTime = 1;
  //   }
  // });
});
