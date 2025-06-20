import "../pages/index.css"; //  импорт главного файла стилей
import { openModal, closeModal } from "./modal.js"; // импорт файла modal.js
import { createCard, deleteCard, addLikeCard, deleteLikeCard } from "./card.js"; // импорт файла card.js
import { enableValidation, clearValidation } from "./validation.js"; // импорт файла validate.js
import {
  getUserAPI,
  getCardsAPI,
  patchUserAPI,
  postAddCardAPI,
  editUserProfileAPI,
} from "./api.js"; // импорт файла api.js

// Константа контейнера с карточками
const listPlaces = document.querySelector(".places__list");

// Константы для popup Edit Profile
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_edit");
const formProfile = document.querySelector('form[name="edit-profile"]');
const formProfileInputName = formProfile.querySelector('input[name="name"]');
const formProfileInputDescription = formProfile.querySelector(
  'input[name="description"]'
);
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Константы для popup Edit Avatar
const profileAvatar = document.querySelector(".profile__image");
const popupProfileAvatar = document.querySelector(".popup_type_edit_avatar");
const formProfileAvatar = document.querySelector(
  'form[name="edit-profile-avatar"]'
);

// Константы для popup New Card
const buttonOpenPopupAddNewCard = document.querySelector(
  ".profile__add-button"
);
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const formAddNewCard = document.querySelector('form[name="new-place"]');
const formAddNewCardInputName = formAddNewCard.querySelector(
  'input[name="place-name"]'
);
const formAddNewCardInputLink = formAddNewCard.querySelector('input[name="link"]');

// Константа для хранения текущего пользователя
let currentUserId = null;

// Константы для popup Image
const popupFullImage = document.querySelector(".popup_type_image");
const popupFullImagePicture = popupFullImage.querySelector(".popup__image");
const popupFullImageCaption = popupFullImage.querySelector(".popup__caption");

// Константа для всех popups
const popups = document.querySelectorAll(".popup");

// Конфигурация валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Константа для хранения карточки для удаления
let cardToDelete = null;

// Константы для popup Confirm Delete Card
const popupConfirmDeleteCard = document.querySelector(".popup_type_confirm_delete_card");
const confirmDeleteCardButton = popupConfirmDeleteCard.querySelector(".popup__button");


// Функция для получения данных пользователя и карточек
const getDataAPI = Promise.all([getUserAPI(), getCardsAPI()]);

// Функция открытия попапа с изображением
function clickPopupFullImage({ name, link }) {
  popupFullImagePicture.src = link;
  popupFullImagePicture.alt = name;
  popupFullImageCaption.textContent = name;
  openModal(popupFullImage);
}

// Функция управления сотоянием загрузки и текста кнопки
function renderLoading(isLoading, button, loadingText = "Сохранение...") {
  if (isLoading) {
    button.dataset.originalText = button.textContent;
    button.textContent = loadingText;
  } else {
    button.textContent = button.dataset.originalText || "Сохранить";
  }
}

// Функция «отправки» формы Edit Profile
function handleProfile(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const submitButton = formProfile.querySelector(".popup__button");
  renderLoading(true, submitButton, "Сохранение..."); // Меняем текст на время загрузки
  const { name, description } = event.currentTarget.elements;
  patchUserAPI({
    name: name.value,
    about: description.value,
  }) // Отправляем данные на сервер
    .then((user) => {
      profileName.textContent = user.name;
      profileDescription.textContent = user.about;
      closeModal(popupProfile);
    })
    .catch((err) => {
      console.log("Ошибка обновления профиля:", err);
    })
    .finally(() => {
      renderLoading(false, submitButton, "Сохранение...");
    });
}

// Функция «отправки» формы Edit Avatar
function handleProfileAvatar(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const submitButton = formProfileAvatar.querySelector(".popup__button");
  renderLoading(true, submitButton, "Сохранение...");// Меняем текст на время загрузки
  const { link } = event.currentTarget.elements;
  editUserProfileAPI({ avatar: link.value }) // Отправляем данные на сервер
    .then((user) => {
      profileAvatar.style.backgroundImage = `url(${user.avatar})`;
      closeModal(popupProfileAvatar);
    })
    .catch((err) => {
      console.log("Ошибка обновления аватара:", err);
    })
    .finally(() => {
      renderLoading(false, submitButton, "Сохранение..."); // Возвращаем исходный текст
    });
}

// Функция «отправки» формы New Card
function handleAddNewCard(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const submitButton = formAddNewCard.querySelector(".popup__button");
  renderLoading(true, submitButton, "Создание..."); // Меняем текст на время загрузки
  const contentCard = {
    name: formAddNewCardInputName.value,
    link: formAddNewCardInputLink.value,
  }; //Получаем данные из формы
  postAddCardAPI(contentCard) // Отправляем данные на сервер
    .then((card) => {
      const cardElement = createCard(
        card,
        addLikeCard,
        clickPopupFullImage,
        card.owner._id, // Передаем id владельца карточки
        deleteLikeCard,
        handleDeleteIconClick
      ); // Создаем карточку
      listPlaces.prepend(cardElement); // добавляем карточку в список
      formAddNewCard.reset(); // Сбрасываем форму
      clearValidation(popupAddNewCard, validationConfig);
      closeModal(popupAddNewCard); // Закрываем попап
    })
    .catch((err) => {
      console.log("Ошибка добавления карточки:", err);
    })
    .finally(() => {
      renderLoading(false, submitButton, "Создание..."); // Возвращаем исходный текст
    });
}

// Функция для обработки клика по иконке удаления карточки
function handleDeleteIconClick(cardId, cardElement) {
  cardToDelete = { id: cardId, element: cardElement };
  openModal(popupConfirmDeleteCard);
  console.log("Клик по иконке удаления карточки:", cardId);
}

// Функция для отрисовки карточек из API
function renderCards() {
  getDataAPI
    .then(([user, cards]) => {
      currentUserId = user._id; // Сохраняем ID текущего пользователя
      cards.forEach((contentCard) => {
        const cardElement = createCard(
          contentCard,
          addLikeCard,
          clickPopupFullImage,
          user._id, // Передаем ID пользователя для проверки владельца карточки
          deleteLikeCard,
          handleDeleteIconClick
        );
        listPlaces.append(cardElement);
      });
    })
    .catch((err) => {
      console.log("Ошибка получения карточек:", err);
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
      console.log("Ошибка получения данных пользователя:", err);
    });
}

fillUserData(); // Заполняем данные пользователя

// Функция включения валидации
enableValidation(validationConfig);

//Открытие popup Edit Profile
buttonOpenPopupProfile.addEventListener("click", () => {
  formProfileInputName.value = profileName.textContent;
  formProfileInputDescription.value = profileDescription.textContent;
  openModal(popupProfile);
  clearValidation(popupProfile, validationConfig);
});

// Открытие popup New Card
buttonOpenPopupAddNewCard.addEventListener("click", () => {
  formAddNewCard.reset();
  openModal(popupAddNewCard);
  clearValidation(popupAddNewCard, validationConfig)
});

// Открытие popup Edit Avatar
profileAvatar.addEventListener("click", () => {
  formProfileAvatar.reset();
  openModal(popupProfileAvatar);
  clearValidation(popupProfileAvatar, validationConfig);
});

// Прикрепляем обработчик к форме :он будет следить за событием “submit” - «отправка»
formProfile.addEventListener("submit", handleProfile);
formAddNewCard.addEventListener("submit", handleAddNewCard);
formProfileAvatar.addEventListener("submit", handleProfileAvatar);

// Обработчик клика по кнопке подтверждения удаления карточки
confirmDeleteCardButton.addEventListener("click", (event) => {
  event.preventDefault(); // Отменяем стандартное поведение кнопки
  if (cardToDelete) {
    deleteCard(cardToDelete.id, cardToDelete.element); // <-- передаём id и элемент!
    closeModal(popupConfirmDeleteCard);
    cardToDelete = null;
  }
});

// Закрытие popup по нажатию на крестик
popups.forEach((popup) => {
  const buttonClosePopup = popup.querySelector(".popup__close");
  buttonClosePopup.addEventListener("click", () => closeModal(popup));
});
