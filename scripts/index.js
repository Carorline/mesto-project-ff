import "../pages/index.css"; //  импорт главного файла стилей
import { initialCards } from "./cards.js"; // импорт файла cards
import { openModal, closeModal } from "./modal.js"; // импорт файла modal.js
import { createCard, deleteCard, likeCard } from "./card.js"; // импорт файла card.js

// Константа контейнера с карточками
const listPlaces = document.querySelector(".places__list");

// Константы для popap Edit Profile
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const formElement = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="description"]');
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");

// Константы для popap New Card
const addButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formNewCard = document.querySelector('form[name="new-place"]');
const nameInputCard = document.querySelector('input[name="place-name"]');
const linkInputCard = document.querySelector('input[name="link"]');

// Константы для popap Image
const popupImage = document.querySelector(".popup_type_image");

// Константа для всех popups
const popups = document.querySelectorAll(".popup");

//Открытие popap Edit Profile
editButton.addEventListener("click", () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openModal(popupEdit);
});

// Открытие popap New Card
addButton.addEventListener("click", () => openModal(popupNewCard));

// Функция открытия попапа с изображением
function clickImage({ name, link }) {
  popupImage.querySelector(".popup__image").src = link;
  popupImage.querySelector(".popup__image").alt = name;
  popupImage.querySelector(".popup__caption").textContent = name;
  openModal(popupImage);
}

// Обработчик «отправки» формы Edit Profile
function handleFormSubmitProfile(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameProfile.textContent = nameInput.value; // Записываем значение в профиль
  jobProfile.textContent = jobInput.value; // Записываем значение в профиль
  closeModal(popupEdit); // Закрываем попап
}

// Обработчик «отправки» формы New Card
function handleFormSubmitNewCard(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const contentCard = { name: nameInputCard.value, link: linkInputCard.value }; // Создаем объект с данными карточки
  const cardElement = createCard(contentCard, deleteCard, likeCard, clickImage); // Создаем карточку
  listPlaces.prepend(cardElement); // добавляем карточку в список
  formNewCard.reset(); // Сбрасываем форму
  closeModal(popupNewCard); // Закрываем попап
}

// Прикрепляем обработчик к форме :он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmitProfile);
formNewCard.addEventListener("submit", handleFormSubmitNewCard);

// Закрытие popap по нажатию на крестик
popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closeModal(popup));
});

// Отрисовка карточек из массива
function renderCards() {
  initialCards.forEach((contentCard) => {
    const cardElement = createCard(
      contentCard,
      deleteCard,
      likeCard,
      clickImage
    );
    listPlaces.append(cardElement);
  });
}

renderCards(); // Отрисовка карточек
