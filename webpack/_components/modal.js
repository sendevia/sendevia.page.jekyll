import { toggleDim, modalTips } from "../app";

export const openModal = () => {
  toggleDim(true);
  modalTips.showModal();
};

export const closeModal = () => {
  toggleDim(false);
  modalTips.style.animation = `var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized) 1 normal both JTM-C-Dialog-ContainerClose`;
  setTimeout(() => {
    modalTips.close();
    modalTips.style.animation = "";
  }, 400);
};
