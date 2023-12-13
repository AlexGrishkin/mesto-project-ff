import "./pages/index.css";
import { initialCards } from "./scripts/cards";
import { openModal, closeModal, closeOverlay } from "./scripts/modal";
import { createCard, deleteCardFunction, likeCard } from "./scripts/card";

// @todo: Контейнер для карточек
const container = document.querySelector(".places__list");

// @todo: Попапы
const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");

// @todo: Кнопки закрытия и открытия попапа
const closeBtns = document.querySelectorAll(".popup__close");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

// @todo: Форма профиля;
const formElementEdit = document.querySelector(
  '.popup__form[name="edit-profile"]'
);
const nameInput = formElementEdit.querySelector('.popup__input[name="name"]');
const jobInput = formElementEdit.querySelector(
  '.popup__input[name="description"]'
);

// @todo: Форма карточки;
const formElementAdd = document.querySelector('.popup__form[name="new-place"]');

//@todo: Функция добавления карточки (разметка)
function addCard(
  dataCard,
  deleteFunction,
  likeCardFunction,
  openImageFunction
) {
  container.append(
    createCard(dataCard, deleteFunction, likeCardFunction, openImageFunction)
  );
}

// @todo: Добавить карточку на страницу через форму с сабмитом
function placeFormSubmit(evt, form, openImagePopup, popupAdd, closeModalFun) {
  evt.preventDefault();
  const placeInput = form.querySelector('.popup__input[name="place-name"]');
  const srcInput = form.querySelector('.popup__input[name="link"]');
  // Получаем значение полей jobInput и nameInput из свойства value
  const placeValue = placeInput.value;
  const srcValue = srcInput.value;
  const obj = { name: placeValue, link: srcValue };
  container.prepend(
    createCard(obj, deleteCardFunction, likeCard, openImagePopup)
  );

  closeModalFun(evt, popupAdd);
}

// @todo: Редактируем данные профиля на странице
function handleFormSubmit(evt, popup) {
  evt.preventDefault();
  // Получаем значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  // Выбираем элементы, куда должны быть вставлены значения полей
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  // Вставляем новые значения с помощью textContent
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  // Закрываем попап после успешного редактирования профиля
  closeModal(evt, popup);
}

// @todo: Открываем попап картинки;
function openImagePopup(evt, obj) {
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

// -----------------ВЫЗОВЫ ФУНКЦИЙ--------------------

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  addCard(element, deleteCardFunction, likeCard, openImagePopup);
});

// @todo: Открытие попапов
editButton.addEventListener("click", function () {
  if (popupEdit.classList.contains("popup_type_edit")) {
    const input1 = popupEdit.querySelector(".popup__input_type_name");
    const input2 = popupEdit.querySelector(".popup__input_type_description");
    input1.value = document.querySelector(".profile__title").textContent;
    input2.value = document.querySelector(".profile__description").textContent;
  }
  openModal(popupEdit);
});
addButton.addEventListener("click", function () {
  openModal(popupAdd);
});

// @todo: Закрытие попапов на крестик
closeBtns.forEach((btn) =>
  btn.addEventListener("click", function (evt) {
    const parentPopup = btn.closest(".popup");
    closeModal(evt, parentPopup);
  })
);

// @todo: Закрытие попапов по оверлею
popups.forEach((el) =>
  el.addEventListener("click", function (evt) {
    closeOverlay(evt, el);
  })
);

// @todo: Редактирование профиля
formElementEdit.addEventListener("submit", function (evt) {
  handleFormSubmit(evt, popupEdit);
});

// @todo: Добавление карточки
formElementAdd.addEventListener("submit", function (evt) {
  placeFormSubmit(evt, formElementAdd, openImagePopup, popupAdd, closeModal);
  formElementAdd.reset();
});
