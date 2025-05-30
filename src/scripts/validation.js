export { enableValidation, clearValidation };

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    // данные атрибута доступны у элемента инпута через ключевое слово dataset.
    // обратите внимание, что в js имя атрибута пишется в camelCase
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
    } else {
      hideInputError(formElement, inputElement, validationConfig);
  }
}

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  // toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      // toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, validationConfig);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

function clearValidation(popup, validationConfig) {
  const inputList = Array.from(
    popup.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = popup.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideInputError(popup, inputElement, validationConfig);
  });

  toggleButtonState(inputList, buttonElement, validationConfig);
}