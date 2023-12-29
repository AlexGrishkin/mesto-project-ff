import { profileName } from "../index";
import { deleteCardId, addLike, removeLike } from "./api ";
// @todo: Переменные для создания карточки
export const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция клонирования шаблона
function getCardTemplate(templateElement, selector) {
  const cardElement = templateElement
    .querySelector(`.${selector}`)
    .cloneNode(true);
  return cardElement;
}

// @todo: Функция создания карточки
export function createCard(
  cardData,
  deleteCard,
  likeCardFunction,
  openImageFunction,
  templateElement
) {
  const cardElement = getCardTemplate(templateElement, "places__item");
  // @todo: присваеваем карточки уникальный айди
  cardElement.id = cardData._id;
  // @todo: необходимые константы
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteCardButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  // @todo: отображаем количество лайков на карточке
  cardElement.querySelector(".card__like-number").textContent =
    cardData.likes.length;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  // @todo: убираем кнопки удаления с не моих карточек
  removeDeleteButton(cardData, deleteCardButton);
  // @todo: удаление карточки по клику
  deleteCardButton.addEventListener("click", deleteCard);
  // @todo: Поставить лайк на карточку
  likeButton.addEventListener("click", likeCardFunction);
  // @todo: Отобразить активное состояние лайка на всех карточках где я поставил лайк
  cardData.likes.forEach((like) => checkMyLike(like._id, likeButton));
  // @todo: Открыть картинку карточки
  cardImage.addEventListener("click", function (evt) {
    openImageFunction(evt, cardData);
  });

  return cardElement;
}

// @todo: Функция удаления карточки

export const deleteCardFunction = function (evt) {
  const card = evt.target.closest(".places__item");
  const cardId = card.id;
  deleteCardId(cardId)
    .then(() => {
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
  const likeNumbers = card.querySelector(".card__like-number");
  if (targetLike.classList.contains("card__like-button_is-active")) {
    removeLike(cardId)
      .then((res) => {
        likeNumbers.textContent = res.likes.length;
        targetLike.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  } else {
    addLike(cardId)
      .then((res) => {
        likeNumbers.textContent = res.likes.length;
        targetLike.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
}

// @todo: Проверка где именно я поставил лайк
function checkMyLike(likeId, likeButton) {
  if (likeId === profileName.id) {
    likeButton.classList.add("card__like-button_is-active");
  }
}

// @todo: Убираем кнопки удаления с карточек, которые создал не я
export function removeDeleteButton(obj, deleteButton) {
  if (obj.owner._id !== profileName.id) {
    deleteButton.remove();
  }
}
