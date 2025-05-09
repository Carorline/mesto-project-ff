export { openModal, closeModal };

// Функция открытия попапа
function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalEsc);
  popup.addEventListener("click", closeModalOverflow);
}

// Функция закрытия попапа
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalEsc);
  popup.removeEventListener("click", closeModalOverflow);
}

// Функция закрытия попапа по нажатию на Esc
function closeModalEsc(event) {
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
}

// Функция закрытия попапа по клику на оверлей
function closeModalOverflow(event) {
  if (event.currentTarget === event.target) {
    closeModal(event.target);
  }
}
