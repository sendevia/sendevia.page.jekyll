/**
 * 添加涟漪效果
 * @param {selector} element
 */
export const ripple = (element) => {
  element.addEventListener("mousedown", (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    const d = Math.max(element.clientWidth, element.clientHeight);

    const rippleC = document.createElement("ripple-effect");
    element.appendChild(rippleC);

    rippleC.style.setProperty("--ripple-effect-x", x);
    rippleC.style.setProperty("--ripple-effect-y", y);
    rippleC.style.setProperty("--ripple-effect-d", d);
  });
  element.addEventListener("animationend", () => {
    const rippleR = element.querySelector("ripple-effect");
    element.removeChild(rippleR);
  });
};
