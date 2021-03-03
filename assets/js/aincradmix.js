//右侧悬浮菜单
var btn = document.getElementById("float-index-btn");
var floatIndex = document.getElementById("float-index");
var btnClose = document.getElementById("float-index-btn-close");

btn.addEventListener("click", function () {
  floatIndex.style.display = "block";
});
btnClose.addEventListener("click", function () {
  floatIndex.style.display = "none";
});

window.onscroll = function(){
  var p = document.documentElement.scrollTop || document.body.scrollTop;
  var onTop = document.getElementById
}
