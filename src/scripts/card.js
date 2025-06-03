export { createCard, deleteCard, addLikeCard, deleteLikeCard};
import {deleteCardAPI, addLikeCardAPI, deleteLikeCardAPI} from "./api.js";

// Константа шаблона для карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
function createCard(
  contentCard,
  addlikeCallback,
  openCardCallback,
  userId,
  deletelikeCallback,
  handleDeleteIconClick
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const buttonAddLikeCard = cardElement.querySelector(".card__like-button");
  const likeCounCard = cardElement.querySelector('.card__like-counter');


  cardTitle.textContent = contentCard.name;
  cardImage.alt = contentCard.name;
  cardImage.src = contentCard.link;
  likeCounCard.textContent = contentCard.likes.length;
  cardElement.id = contentCard._id;

  // Проверка, является ли текущий пользователь владельцем карточки
  if(contentCard.owner._id !== userId) {
    buttonDelete.classList.add("card__delete-button-hidden");
  } else {
    buttonDelete.addEventListener("click", () => {
      handleDeleteIconClick(contentCard._id, cardElement);
    });
  }

  // Проверка, есть ли лайк от текущего пользователя
  if (contentCard.likes.some(user => user._id === userId)) {
  buttonAddLikeCard.classList.add("card__like-button_is-active");
  }

  buttonAddLikeCard.addEventListener("click", (event) => {
    if (event.target.classList.contains("card__like-button_is-active")) {
      deletelikeCallback(event);
    } else {
      addlikeCallback(event);
    }
  });

  cardImage.addEventListener("click", () => {
    openCardCallback(contentCard);
  });

  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardId, cardElement) {
  deleteCardAPI(cardId) // Удаляем карточку из API
    .then(() => {
      cardElement.remove();; // Удаляем карточку из DOM
    })
    .catch((err) => {
      console.log('Ошибка удаления карточки:', err);
    });
}

// Функция лайка карточки
function addLikeCard(event) {
  addLikeCardAPI(event.target.closest('.card').id) // Лайкаем карточку в API
    .then((data) => {
      event.target.classList.add("card__like-button_is-active");
      const likeCountElement = event.target.closest('.card').querySelector('.card__like-counter');
      likeCountElement.textContent = data.likes.length; // Обновляем счетчик лайков
    })
    .catch((err) => {
      console.log('Ошибка добавления лайка:', err);
    });
}

// Функция удаления лайка с карточки
function deleteLikeCard(event) {
  deleteLikeCardAPI(event.target.closest('.card').id) // Удаляем лайк с карточки в API
    .then((data) => {
      event.target.classList.remove("card__like-button_is-active");
      const likeCountElement = event.target.closest('.card').querySelector('.card__like-counter');
      likeCountElement.textContent = data.likes.length; // Обновляем счетчик лайков
    })
    .catch((err) => {
      console.log('Ошибка удаления лайка:', err);
    });
}
