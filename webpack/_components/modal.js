import { toggleDim, modalTips } from "../app";

export const openModal = () => {
  toggleDim(true);
  modalTips.style.animation = `JTM-C-Dialog-Show var(--md-sys-motion-duration-long1) var(--md-sys-motion-easing-emphasized) 1 normal both`;
  modalTips.showModal();
};

export const closeModal = () => {
  toggleDim(false);
  modalTips.style.animation = `JTM-C-Dialog-Close var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized) 1 normal both`;
  setTimeout(() => {
    modalTips.close();
    modalTips.style.animation = "";
  }, 400);
};
