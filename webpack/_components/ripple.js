/**
 * 添加涟漪效果
 * @param {selector} element
 */
export const effectRipple = (element) => {
  element.addEventListener("mousedown", (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    const d = Math.max(element.clientWidth, element.clientHeight);

    const rippleC = document.createElement("e-ripple");
    element.appendChild(rippleC);

    rippleC.style.setProperty("--e-ripple-PosX", x);
    rippleC.style.setProperty("--e-ripple-PosY", y);
    rippleC.style.setProperty("--e-ripple-Diameter", d);
  });
  element.addEventListener("animationend", () => {
    const rippleR = element.querySelector("e-ripple");
    element.removeChild(rippleR);
  });
};
