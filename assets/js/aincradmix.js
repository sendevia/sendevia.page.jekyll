//右侧悬浮菜单
$(document).ready(function(){
  $(".float-btn").click(function(){
    $(".float-index-bg").fadeToggle(500);
  })
})
//lottie元素_warn
var animation = lottie.loadAnimation({
  container: document.getElementById("warn"),
  path: "assets/animations/warn.json",
  renderer: "svg",
  loop: false,
  autoplay: true,
});
