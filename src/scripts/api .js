// @todo:общий конфиг
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-3",
  headers: {
    authorization: "930818e0-99e4-4bc7-b9c5-ae3fef663f9a",
    "Content-Type": "application/json",
  },
};

// @todo: Проверяем ответ от сервера
function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// @todo: Получаем данные о пользователе
export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(getResponse);
}

// @todo: Получаем карточки которые загрузили пользователи
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(getResponse);
}

// @todo: Заменяем данные о пользователе на сервере
export function addUserInfo(addName, addAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: addName,
      about: addAbout,
    }),
  }).then(getResponse);
}

// @todo: Отправляем на сервер новую карточку
export function addNewCard(obj) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: obj.name,
      link: obj.link,
    }),
  }).then(getResponse);
}

// @todo: Удаляем карточку с сервера
export function deleteCardId(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponse);
}

// @todo: Поставить лайк на карточку
export function addLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(getResponse);
}

// @todo: Убрать лайк с карточки
export function removeLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponse);
}

// @todo: Заменить аватар пользователя
export function addNewUserAvatar(addAvatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: addAvatar,
    }),
  }).then(getResponse);
}
