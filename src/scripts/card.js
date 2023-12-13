// @todo: Переменные для создания карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function createCard(
  cardData,
  deleteCard,
  likeCardFunction,
  openImageFunction
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  likeButton.addEventListener("click", likeCardFunction);
  cardImage.addEventListener("click", function (evt) {
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
