// @todo: Открыть попап
export function openModal(popup) {
  if (popup.classList.contains("popup_type_edit")) {
    const input1 = popup.querySelector(".popup__input_type_name");
    const input2 = popup.querySelector(".popup__input_type_description");
    input1.value = document.querySelector(".profile__title").textContent;
    input2.value = document.querySelector(".profile__description").textContent;
  }
  popup.classList.add("popup_is-opened");
}

// @todo: Закрыть попап
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

// @todo: Закрыть попап нажатием на Escape
export function keyHandler(evt) {
  // Находим открытое всплывающее окно
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape" && openedPopup) {
    evt.preventDefault();
    openedPopup.classList.remove("popup_is-opened");
    openedPopup.removeEventListener("keydown", keyHandler);
  }
}

// @todo: Закрыть попап нажатием на оверлей
export function closeOverlay(evt, popup) {
  if (evt.target == popup) {
    console.log(evt.target);
    popup.classList.remove("popup_is-opened");
  }
}

// @todo: Редактируем данные профиля на странице
export function handleFormSubmit(evt, form, popup) {
  evt.preventDefault();
  const nameInput = form.querySelector('.popup__input[name="name"]');
  const jobInput = form.querySelector('.popup__input[name="description"]');
  // Получаем значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  // Выбираем элементы, куда должны быть вставлены значения полей
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  // Вставляем новые значения с помощью textContent
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  // Закрываем попап после успешного редактирования профиля (ваш код для закрытия попапа)
  closeModal(popup);
}

// @todo: Открываем попап картинки;
export function openImagePopup(evt, obj) {
  if (evt.target.classList.contains("card__image")) {
    const imagePopup = document.querySelector(".popup_type_image");
    const image = imagePopup.querySelector(".popup__image");
    const imageCaption = imagePopup.querySelector(".popup__caption");
    image.src = obj.link;
    image.alt = obj.name;
    imageCaption.textContent = obj.name;
    openModal(imagePopup);
  }
}
