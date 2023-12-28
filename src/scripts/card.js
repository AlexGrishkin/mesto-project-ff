import { profileName } from "../index";
import { deleteCardId, addLike, removeLike } from "./api ";
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
  cardElement.id = cardData._id;
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteCardButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardElement.querySelector(".card__like-number").textContent =
    cardData.likes.length;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  removeDeleteButton(cardData, deleteCardButton);
  deleteCardButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", likeCardFunction);
  cardImage.addEventListener("click", function (evt) {
    openImageFunction(evt, cardData);
  });

  return cardElement;
}

// @todo: Функция удаления карточки

export const deleteCardFunction = function (evt) {
  const card = evt.target.closest(".places__item");
  // console.log(card);
  const cardId = card.id;
  // console.log(cardId);
  deleteCardId(cardId)
    .then(() => {
      // console.log(res);
      card.remove();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

// @todo: Поставить лайк на карточку

export function likeCard(evt) {
  const card = evt.target.closest(".places__item");
  const cardId = card.id;
  const targetLike = evt.target;
  let likeNumbers = card.querySelector(".card__like-number");
  if (targetLike.classList.contains("card__like-button")) {
    targetLike.classList.toggle("card__like-button_is-active");
  }
  if (targetLike.classList.contains("card__like-button_is-active")) {
    addLike(cardId)
      .then((res) => {
        console.log(res.likes.length);
        likeNumbers.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  } else {
    removeLike(cardId)
      .then((res) => {
        console.log(res.likes.length);
        likeNumbers.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
}

export function removeDeleteButton(obj, deleteButton) {
  if (obj.owner._id !== profileName.id) {
    deleteButton.remove();
  }
}
