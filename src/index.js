import "./pages/index.css";
import {
  initialCards,
  createCard,
  deleteCardFunction,
  likeCard,
  placeFormSubmit,
} from "./scripts/cards";
import {
  openModal,
  closeModal,
  keyHandler,
  closeOverlay,
  handleFormSubmit,
  openImagePopup,
} from "./scripts/modal";

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

// @todo: Форма карточки;
const formElementAdd = document.querySelector('.popup__form[name="new-place"]');

// -----------------ВЫЗОВЫ ФУНКЦИЙ--------------------

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

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  addCard(element, deleteCardFunction, likeCard, openImagePopup);
});

// @todo: Открытие попапов edit
editButton.addEventListener("click", function () {
  openModal(popupEdit);
});
addButton.addEventListener("click", function () {
  openModal(popupAdd);
});

// @todo: Закрытие попапов на крестик
closeBtns.forEach((btn) =>
  btn.addEventListener("click", function () {
    const parentPopup = btn.closest(".popup");
    closeModal(parentPopup);
  })
);

// @todo: Закрытие попапов по оверлею
popups.forEach((el) =>
  el.addEventListener("click", function (evt) {
    closeOverlay(evt, el);
  })
);
// @todo: Закрытие попапов по кнопке Escape
document.addEventListener("keydown", keyHandler);

// @todo: Редактирование профиля
formElementEdit.addEventListener("submit", function (evt) {
  handleFormSubmit(evt, formElementEdit, popupEdit);
});

// @todo: Добавление карточки
formElementAdd.addEventListener("submit", function (evt) {
  placeFormSubmit(evt, formElementAdd, openImagePopup, popupAdd, closeModal);
  formElementAdd.reset();
});
