export {
  getUserAPI,
  getCardsAPI,
  patchUserAPI,
  postAddCardAPI,
  deleteCardAPI,
  addLikeCardAPI,
  deleteLikeCardAPI,
  editUserProfileAPI,
};

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-40",
  headers: {
    authorization: "3d67b788-d5fd-47b6-8c9b-eafae687e243",
    "Content-Type": "application/json",
  },
};

const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Функция для получения данных пользователя из API
const getUserAPI = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(getResponseData)
};

// Функция для получения карточек из API
const getCardsAPI = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(getResponseData)
};

// Функция для обновления данных пользователя в API
const patchUserAPI = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    }),
  }).then(getResponseData)
};

// Функция для добавления карточки в API
const postAddCardAPI = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link,
    }),
  }).then(getResponseData)
};

// Функция для удаления карточки из API
const deleteCardAPI = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseData)
};

// Функция для лайка карточки в API
const addLikeCardAPI = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(getResponseData)
};

// Функция для удаления лайка с карточки в API
const deleteLikeCardAPI = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseData)
};

// Функция для редактирования профиля пользователя (аватара) в API
const editUserProfileAPI = (data) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: data.avatar,
    }),
  }).then(getResponseData)
};
