// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// @todo: Функция создания карточки
function createCard(contentCard, deleteCallback) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__title").textContent = contentCard.name;
  cardElement.querySelector(".card__image").src = contentCard.link;
  cardElement.querySelector(".card__image").alt = contentCard.name;
  
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", () => {deleteCallback(cardElement);});

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
const listPlaces = document.querySelector(".places__list");

initialCards.forEach((contentCard) => {
  const cardElement = createCard(contentCard, deleteCard);
  listPlaces.append(cardElement);
});
