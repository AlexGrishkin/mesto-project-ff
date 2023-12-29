import "./pages/index.css";
// import { initialCards } from "./scripts/cards";
import { openModal, closeModal, closeOverlay } from "./scripts/modal";
import { createCard, deleteCardFunction, likeCard } from "./scripts/card";
import { enableValidation, clearValidation } from "./scripts/validation";
import {
  getUserInfo,
  getInitialCards,
  addUserInfo,
  addNewCard,
  addNewUserAvatar,
} from "./scripts/api ";

// @todo: Контейнер для карточек
const container = document.querySelector(".places__list");

// @todo: Заголовки профиля
export const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

// @todo: Попапы
const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupAvatar = document.querySelector(".popup_type_new-avatar");

// @todo: Кнопки закрытия и открытия попапа
const closeBtns = document.querySelectorAll(".popup__close");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const newAvatarButton = document.querySelector(".profile__avatar_edit-button");

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
const placeInput = formElementAdd.querySelector(
  '.popup__input[name="place-name"]'
);
const srcInput = formElementAdd.querySelector('.popup__input[name="link"]');

// @todo: Форма аватара;
const formElementAvatar = document.querySelector(
  '.popup__form[name="new-avatar"]'
);
const srcInputAvatar = formElementAvatar.querySelector(
  '.popup__input[name="link"]'
);

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
function placeFormSubmit(evt) {
  evt.preventDefault();
  const popupButton = evt.target.querySelector(".popup__button");
  // Получаем значение полей placeValue и srcValue из свойства value и передаем их в объект
  const placeValue = placeInput.value;
  const srcValue = srcInput.value;
  const obj = { name: placeValue, link: srcValue };
  // Меняем текст кнопки сохранить при загрузке данных
  renderLoading(true, popupButton);
  // Создаем новую карточку, добавляем ее на сервер и на страницу
  addNewCard(obj)
    .then((res) => {
      container.prepend(
        createCard(res, deleteCardFunction, likeCard, openImagePopup)
      );

      closeModal(popupAdd);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, popupButton);
    });
}

// @todo: Редактируем данные профиля на странице
function handleFormSubmit(evt) {
  evt.preventDefault();
  const popupButton = evt.target.querySelector(".popup__button");
  // Получаем значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  // Меняем текст кнопки сохранить при загрузке данных
  renderLoading(true, popupButton);
  // Меняем данные пользователя на сервере и на странице
  addUserInfo(nameValue, jobValue)
    .then((res) => {
      profileName.id = res._id;
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, popupButton);
    });
}

// @todo: Редактируем аватар на странице

function avatarFormSubmit(evt) {
  evt.preventDefault();
  const popupButton = evt.target.querySelector(".popup__button");
  // Получаем значение поля srcInputAvatar
  const srcValue = srcInputAvatar.value;
  // Меняем текст кнопки сохранить при загрузке данных
  renderLoading(true, popupButton);
  // Меняем аватар на сервере и на странице
  addNewUserAvatar(srcValue)
    .then((res) => {
      profileImage.src = res.avatar;
      closeModal(popupAvatar);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, popupButton);
    });
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

// @todo: Меняем текст кнопки сохранить при загрузке данных
function renderLoading(isLoading, button) {
  const buttonText = "Сохранить";
  const loadingText = "Сохранение...";
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

// -----------------ВЫЗОВЫ ФУНКЦИЙ--------------------

// @todo: Вывести карточки на страницу

const initialCards = (cardsArr) =>
  cardsArr.forEach(function (element) {
    addCard(element, deleteCardFunction, likeCard, openImagePopup);
  });

// @todo: Открытие попапов
editButton.addEventListener("click", function () {
  const inputName = popupEdit.querySelector(".popup__input_type_name");
  const inputDescription = popupEdit.querySelector(
    ".popup__input_type_description"
  );
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  clearValidation(popupEdit, {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  });
  openModal(popupEdit);
});

addButton.addEventListener("click", function () {
  clearValidation(popupAdd, {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  });
  openModal(popupAdd);
});

newAvatarButton.addEventListener("click", function () {
  clearValidation(popupAvatar, {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  });
  openModal(popupAvatar);
});

// @todo: Закрытие попапов на крестик
closeBtns.forEach((btn) =>
  btn.addEventListener("click", function (evt) {
    const parentPopup = btn.closest(".popup");
    closeModal(parentPopup);
  })
);

// @todo: Закрытие попапов по оверлею
popups.forEach((el) =>
  el.addEventListener("mousedown", function (evt) {
    closeOverlay(evt, el);
  })
);

// @todo: Редактирование профиля
formElementEdit.addEventListener("submit", handleFormSubmit);

// @todo: Добавление карточки
formElementAdd.addEventListener("submit", function (evt) {
  placeFormSubmit(evt);
  formElementAdd.reset();
});

// @todo: Редактирование аватара

formElementAvatar.addEventListener("submit", function (evt) {
  avatarFormSubmit(evt);
  formElementAvatar.reset();
});

// @todo: Включаем валидацию
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

// @todo: Выводим все карточки созданные другими студентами, получаем и присваиваем данные профиля, получаем уникальный идентификатор для дальнейшей работы;

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, dataCards]) => {
    profileName.id = userData._id;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.src = userData.avatar;
    initialCards(dataCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
