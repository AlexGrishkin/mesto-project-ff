// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const container = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  return cardElement;
}

//@todo: Функция добавления карточки (разметка)
function addCard(dataCard, deleteFunction) {
  container.append(createCard(dataCard, deleteFunction));
}
// @todo: Функция удаления карточки
const deleteCardFunction = function (evt) {
  evt.target.closest(".places__item").remove();
};
// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  addCard(element, deleteCardFunction);
});
