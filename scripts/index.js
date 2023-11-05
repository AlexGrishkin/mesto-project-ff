// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const container = document.querySelector(".places__list");
// @todo: Функция создания карточки
function addCard(dataCard, deleteFunction) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__image").src = dataCard.link;
  cardElement.querySelector(".card__title").textContent = dataCard.name;
  container.append(cardElement);
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteFunction);
}
// @todo: Функция удаления карточки
const deleteCard = function (evt) {
  evt.target.closest(".places__item").remove();
};
// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  addCard(element, deleteCard);
});
