// @todo: Открыть попап
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", keyHandler);
}

// @todo: Закрыть попап
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", keyHandler);
}

// @todo: Закрыть попап нажатием на Escape
export function keyHandler(evt) {
  // Находим открытое всплывающее окно
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

// @todo: Закрыть попап нажатием на оверлей
export function closeOverlay(evt, popup) {
  if (evt.target == popup) {
    closeModal(popup);
  }
}
