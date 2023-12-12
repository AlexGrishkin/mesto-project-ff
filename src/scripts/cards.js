export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// @todo: Переменные для создания карточки
const cardTemplate = document.querySelector("#card-template").content;
const container = document.querySelector(".places__list");

// @todo: Функция создания карточки
export function createCard(
  cardData,
  deleteCard,
  likeCardFunction,
  openImageFunction
) {
  // const cardTemplate = document.querySelector("#card-template").content;
  // const container = document.querySelector(".places__list");
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  container.addEventListener("click", likeCardFunction);
  cardElement.addEventListener("click", function (evt) {
    openImageFunction(evt, cardData);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
export const deleteCardFunction = function (evt) {
  evt.target.closest(".places__item").remove();
};

// @todo: Поставить лайк на карточку
export function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

// @todo: Добавить карточку на страницу через форму с сабмитом
export function placeFormSubmit(
  evt,
  form,
  openImagePopup,
  popupAdd,
  closeModalFun
) {
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

  closeModalFun(popupAdd);
}
