import "../pages/index.css"; //  импорт главного файла стилей
import { openModal, closeModal } from "./modal.js"; // импорт файла modal.js
import { createCard, deleteCard, addLikeCard, deleteLikeCard } from "./card.js"; // импорт файла card.js
import { enableValidation, clearValidation } from "./validation.js"; // импорт файла validate.js
import { getUserAPI, getCardsAPI, patchUserAPI, postAddCardAPI, editUserProfileAPI } from "./api.js"; // импорт файла api.js

// Константа контейнера с карточками
const listPlaces = document.querySelector(".places__list");

// Константы для popup Edit Profile
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_edit");
const formProfile = document.querySelector('form[name="edit-profile"]');
const formProfileInputName = document.querySelector('input[name="name"]');
const formProfileInputDescription = document.querySelector(
  'input[name="description"]'
);
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

// Константы для popup New Card
const buttonOpenPopupAddNewCard = document.querySelector(
  ".profile__add-button"
);
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const formAddNewCard = document.querySelector('form[name="new-place"]');
const formAddNewCardInputName = document.querySelector(
  'input[name="place-name"]'
);
const formAddNewCardInputLink = document.querySelector('input[name="link"]');

// Константы для popup Image
const popupFullImage = document.querySelector(".popup_type_image");
const popupFullImagePicture = popupFullImage.querySelector(".popup__image");
const popupFullImageCaption = popupFullImage.querySelector(".popup__caption");

// Константа для всех popups
const popups = document.querySelectorAll(".popup");

// Конфигурация валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const getDataAPI = Promise.all([getUserAPI(), getCardsAPI()]);

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
  const {name, description} =  event.currentTarget.elements;
  patchUserAPI({ 
    name: name.value, 
    about: description.value 
  }) // Отправляем данные на сервер
    .then((user) => {
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    closeModal(popupProfile);
    })
    .catch((err) => {
      console.log('Ошибка обновления профиля:', err);
    });
}

// Функция «отправки» формы New Card
function handleAddNewCard(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const  contentCard = {name:formAddNewCardInputName.value, link:formAddNewCardInputLink.value}; // 
  // Получаем данные из формы
  postAddCardAPI(contentCard) // Отправляем данные на сервер
    .then((card) => {
      const cardElement = createCard(
        card,
        deleteCard,
        addLikeCard,
        clickPopupFullImage,
        card.owner._id, // Передаем id владельца карточки
        deleteLikeCard
      ); // Создаем карточку
      listPlaces.prepend(cardElement); // добавляем карточку в список
      formAddNewCard.reset(); // Сбрасываем форму
      clearValidation(popupAddNewCard, validationConfig);
      closeModal(popupAddNewCard); // Закрываем попап
    })
    .catch((err) => {
      console.log('Ошибка добавления карточки:', err);
    });
}

// Функция для отрисовки карточек из API
function renderCards() {
  getDataAPI
  .then(([user, cards]) => {
      cards.forEach((contentCard) => {
        const cardElement = createCard(
          contentCard,
          deleteCard,
          addLikeCard,
          clickPopupFullImage,
          user._id, // Передаем ID пользователя для проверки владельца карточки
          deleteLikeCard
        );
        listPlaces.append(cardElement);
      });
    })
  .catch((err) => {
      console.log('Ошибка получения карточек:', err);
    });
}

renderCards(); // Отрисовка карточек

// Функция для заполнения данных пользователя из API
function fillUserData() {
  getDataAPI
    .then(([user, cards]) => {
      profileName.textContent = user.name; // Записываем имя пользователя в профиль
      profileDescription.textContent = user.about; // Записываем описание пользователя в профиль
      profileAvatar.style.backgroundImage = `url(${user.avatar})`; // Записываем аватар пользователя в профиль
    })
    .catch((err) => {
      console.log('Ошибка получения данных пользователя:', err);
  });
} 

fillUserData(); // Заполняем данные пользователя

// Функция включения валидации 
enableValidation(validationConfig);

//Открытие popap Edit Profile
buttonOpenPopupProfile.addEventListener("click", () => {
  formProfileInputName.value = profileName.textContent;
  formProfileInputDescription.value = profileDescription.textContent;
  openModal(popupProfile);
  clearValidation(popupProfile, validationConfig);
});

// Открытие popap New Card
buttonOpenPopupAddNewCard.addEventListener("click", () =>
  openModal(popupAddNewCard)
);

// Прикрепляем обработчик к форме :он будет следить за событием “submit” - «отправка»
formProfile.addEventListener("submit", handleProfile);
formAddNewCard.addEventListener("submit", handleAddNewCard);

// Закрытие popap по нажатию на крестик
popups.forEach((popup) => {
  const buttonClosePopup = popup.querySelector(".popup__close");
  buttonClosePopup.addEventListener("click", () => closeModal(popup));
});
