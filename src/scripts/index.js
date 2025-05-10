import "../pages/index.css"; //  импорт главного файла стилей
import { initialCards } from "./cards.js"; // импорт файла cards
import { openModal, closeModal } from "./modal.js"; // импорт файла modal.js
import { createCard, deleteCard, addLikeCard } from "./card.js"; // импорт файла card.js

// Константа контейнера с карточками
const listPlaces = document.querySelector(".places__list");

// Константы для popap Edit Profile
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_edit");
const formProfile = document.querySelector('form[name="edit-profile"]');
const formProfileInputName = document.querySelector('input[name="name"]');
const formProfileInputDescription = document.querySelector('input[name="description"]');
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Константы для popap New Card
const buttonOpenPopupAddNewCard = document.querySelector(".profile__add-button");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const formAddNewCard = document.querySelector('form[name="new-place"]');
const formAddNewCardInputName = document.querySelector('input[name="place-name"]');
const formAddNewCardInputLink = document.querySelector('input[name="link"]');

// Константы для popap Image
const popupFullImage = document.querySelector(".popup_type_image");
const popupFullImagePicture= popupFullImage.querySelector(".popup__image");
const popupFullImageCaption = popupFullImage.querySelector(".popup__caption");


// Константа для всех popups
const popups = document.querySelectorAll(".popup");

// Функция открытия попапа с изображением
function clickPopupFullImage({ name, link }) {
  popupFullImagePicture.src = link;
  popupFullImagePicture.alt = name;
  popupFullImageCaption.textContent = name;
  openModal(popupFullImage);
}

// Функция «отправки» формы Edit Profile
function handleProfile(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = formProfileInputName.value; // Записываем значение в профиль
  profileDescription.textContent = formProfileInputDescription.value; // Записываем значение в профиль
  closeModal(popupProfile); // Закрываем попап
}

// Функция «отправки» формы New Card
function handleAddNewCard(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const contentCard = { name: formAddNewCardInputName.value, link: formAddNewCardInputLink.value }; // Создаем объект с данными карточки
  const cardElement = createCard(contentCard, deleteCard, addLikeCard, clickPopupFullImage); // Создаем карточку
  listPlaces.prepend(cardElement); // добавляем карточку в список
  formAddNewCard.reset(); // Сбрасываем форму
  closeModal(popupAddNewCard); // Закрываем попап
}

// Отрисовка карточек из массива
function renderCards() {
  initialCards.forEach((contentCard) => {
    const cardElement = createCard(
      contentCard,
      deleteCard,
      addLikeCard,
      clickPopupFullImage
    );
    listPlaces.append(cardElement);
  });
}

renderCards(); // Отрисовка карточек

//Открытие popap Edit Profile
buttonOpenPopupProfile.addEventListener("click", () => {
  formProfileInputName.value = profileName.textContent;
  formProfileInputDescription.value = profileDescription.textContent;
  openModal(popupProfile);
});

// Открытие popap New Card
buttonOpenPopupAddNewCard.addEventListener("click", () => openModal(popupAddNewCard));

// Прикрепляем обработчик к форме :он будет следить за событием “submit” - «отправка»
formProfile.addEventListener("submit", handleProfile);
formAddNewCard.addEventListener("submit", handleAddNewCard);

// Закрытие popap по нажатию на крестик
popups.forEach((popup) => {
  const buttonClosePopup = popup.querySelector(".popup__close");
  buttonClosePopup.addEventListener("click", () => closeModal(popup));
});