export { createCard, deleteCard, addLikeCard };

// Константа шаблона для карточки
const cardTemplate = document.querySelector("#card-template").content;
// Функция создания карточки
function createCard(
  contentCard,
  deleteCallback,
  likeCallback,
  openCardCallback
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const buttonAddLikeCard = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = contentCard.name;
  cardImage.alt = contentCard.name;
  cardImage.src = contentCard.link;

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
  cardElement.remove();
}

// Функция лайка карточки
function addLikeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}
