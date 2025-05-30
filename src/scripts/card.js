export { createCard, deleteCard, addLikeCard };
import {deleteCardAPI} from "./api.js";

// Константа шаблона для карточки
const cardTemplate = document.querySelector("#card-template").content;
// Функция создания карточки
function createCard(
  contentCard,
  deleteCallback,
  likeCallback,
  openCardCallback,
  userId
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
  }

  buttonDelete.addEventListener("click", () => { 
    deleteCallback(cardElement);
  });

  buttonAddLikeCard.addEventListener("click", (event) => {
    likeCallback(event);
  });

  cardImage.addEventListener("click", () => {
    openCardCallback(contentCard);
  });

  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement) {
  deleteCardAPI(cardElement.id) // Удаляем карточку из API
    .then(() => {
      cardElement.remove();; // Удаляем карточку из DOM
    })
    .catch((err) => {
      console.log('Ошибка удаления карточки:', err);
    });
}

// Функция лайка карточки
function addLikeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}
