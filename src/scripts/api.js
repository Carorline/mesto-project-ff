export {getUserAPI, getCardsAPI, patchUserAPI, postAddCardAPI, deleteCardAPI, addLikeCardAPI, deleteLikeCardAPI, editUserProfileAPI};

// Функция для получения данных пользователя из API
const getUserAPI = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-40/users/me',{
    headers: {
      authorization: '3d67b788-d5fd-47b6-8c9b-eafae687e243'
    }
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Ошибка сети: ' + res.status);
    }
    return res.json();
  })
}

// Функция для получения карточек из API
const getCardsAPI = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-40/cards',{
    headers: {
      authorization: '3d67b788-d5fd-47b6-8c9b-eafae687e243'
    }
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Ошибка сети: ' + res.status);
    }
    return res.json();
  })
}

// Функция для обновления данных пользователя в API
function patchUserAPI(data) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-40/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '3d67b788-d5fd-47b6-8c9b-eafae687e243',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
    .then(res => {
    if (!res.ok) {
      throw new Error('Ошибка сети: ' + res.status);
    }
    return res.json();
  })
}


// Функция для добавления карточки в API
function postAddCardAPI(data) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-40/cards', {
    method: 'POST',
    headers: {
      authorization: '3d67b788-d5fd-47b6-8c9b-eafae687e243',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  })
    .then(res => {
    if (!res.ok) {
      throw new Error('Ошибка сети: ' + res.status);
    }
    return res.json();
  })
}

// Функция для удаления карточки из API
const deleteCardAPI = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-40/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '3d67b788-d5fd-47b6-8c9b-eafae687e243',
    }
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Ошибка сети: ' + res.status);
    }
    return res.json();
  })
}
 // Функция для лайка карточки в API
 function addLikeCardAPI(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-40/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: '3d67b788-d5fd-47b6-8c9b-eafae687e243',
    }
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Ошибка сети: ' + res.status);
    }
    return res.json();
  })
 }

 // Функция для удаления лайка с карточки в API
function deleteLikeCardAPI(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-40/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '3d67b788-d5fd-47b6-8c9b-eafae687e243',
    }
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Ошибка сети: ' + res.status);
    }
    return res.json();
  })
}

// Функция для редактирования профиля пользователя (аватара) в API
function editUserProfileAPI(data) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-40/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '3d67b788-d5fd-47b6-8c9b-eafae687e243',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: data.avatar
    })
  })
    .then(res => {
    if (!res.ok) {
      throw new Error('Ошибка сети: ' + res.status);
    }
    return res.json();
  })
}
