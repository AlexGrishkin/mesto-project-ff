// включение валидации вызовом enableValidation
// все настройки передаются при вызове

// enableValidation({
//    formSelector: '.popup__form',
//    inputSelector: '.popup__input',
//    submitButtonSelector: '.popup__button',
//    inactiveButtonClass: 'popup__button_disabled',
//    inputErrorClass: 'popup__input_type_error',
//    errorClass: 'popup__error_visible'
//  });

// const formElement = document.querySelector(".popup__form");
// const formInput = document.querySelector(".popup__input");
// const formError = document.querySelector(`.${formInput.id}_error`);

export const enableValidation = ({
  formSelector,
  inputSelector,
  inputErrorClass,
  submitButtonSelector,
  inactiveButtonClass,
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListenets(
      formElement,
      inputSelector,
      inputErrorClass,
      submitButtonSelector,
      inactiveButtonClass
    );
  });
};

const setEventListenets = (
  formElement,
  inputSelector,
  inputErrorClass,
  submitButtonSelector,
  inactiveButtonClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  // formElement.addEventListener("reset", () => {
  //   setTimeout(() => {
  //     disableButton(buttonElement, inactiveButtonClass);
  //   }, 0);
  // });
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, inputErrorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

export const clearValidation = (
  formElement,
  { inputSelector, inputErrorClass, inactiveButtonClass, submitButtonSelector }
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    const formError = formElement.querySelector(`.${inputElement.id}_error`);
    hideInputError(inputElement, formError, inputErrorClass);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  });
};

const showInputError = (
  inputElement,
  errorElement,
  inputErrorClass,
  errorMessage
) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (inputElement, errorElement, inputErrorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, inputErrorClass) => {
  const formError = formElement.querySelector(`.${inputElement.id}_error`);
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      inputElement,
      formError,
      inputErrorClass,
      inputElement.validationMessage
    );
  } else {
    hideInputError(inputElement, formError, inputErrorClass);
  }
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasValidInput(inputList)) {
    disableButton(buttonElement, inactiveButtonClass);
  } else {
    enableButton(buttonElement, inactiveButtonClass);
  }
};

const hasValidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const enableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
};

const disableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
};
