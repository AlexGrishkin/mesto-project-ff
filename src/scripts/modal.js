// @todo: Открыть попап
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", keyHandler);
}

// @todo: Закрыть попап
export function closeModal(evt, popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener(evt, keyHandler);
}

// @todo: Закрыть попап нажатием на Escape
export function keyHandler(evt) {
  // Находим открытое всплывающее окно
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape" && openedPopup) {
    closeModal(evt, openedPopup);
  }
}

// @todo: Закрыть попап нажатием на оверлей
export function closeOverlay(evt, popup) {
  if (evt.target == popup) {
    closeModal(evt, popup);
  }
}
