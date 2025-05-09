export { createCard, deleteCard, addLikeCard};

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
  cardElement.querySelector(".card__title").textContent = contentCard.name;
  cardImage.alt = contentCard.name;
  cardImage.src = contentCard.link;

  const buttonDelete = cardElement.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", () => {
    deleteCallback(cardElement);
  });

  const buttonAddLikeCard = cardElement.querySelector(".card__like-button");
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
