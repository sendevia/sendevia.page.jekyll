/**
 * 添加涟漪效果
 * @param {selector} element
 */
export const ripple = (element) => {
  element.addEventListener("mousedown", (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    const d = Math.max(element.clientWidth, element.clientHeight);

    const rippleC = document.createElement("JTM-E-Ripple");
    element.appendChild(rippleC);

    rippleC.style.setProperty("--JTM-E-Ripple-PosX", x);
    rippleC.style.setProperty("--JTM-E-Ripple-PosY", y);
    rippleC.style.setProperty("--JTM-E-Ripple-Diameter", d);
  });
  element.addEventListener("animationend", () => {
    const rippleR = element.querySelector("JTM-E-Ripple");
    element.removeChild(rippleR);
  });
};
