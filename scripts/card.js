export { createCard, deleteCard, likeCard};

// Функция создания карточки
function createCard(
  contentCard,
  deleteCallback,
  likeCallback,
  openCardCallback
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const card = cardElement.querySelector(".card__image");
  cardElement.querySelector(".card__title").textContent = contentCard.name;
  card.alt = contentCard.name;
  card.src = contentCard.link;

  const buttonDelete = cardElement.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", () => {
    deleteCallback(cardElement);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", (event) => {
    likeCallback(event);
  });

  card.addEventListener("click", () => {
    openCardCallback(contentCard);
  });

  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция лайка карточки
function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}
