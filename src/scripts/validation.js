// enableValidation({
//    formSelector: '.popup__form',
//    inputSelector: '.popup__input',
//    submitButtonSelector: '.popup__button',
//    inactiveButtonClass: 'popup__button_disabled',
//    inputErrorClass: 'popup__input_type_error',
//    errorClass: 'popup__error_visible'
//  });

// @todo: Включаем валидацию
export function enableValidation({
  formSelector,
  inputSelector,
  inputErrorClass,
  submitButtonSelector,
  inactiveButtonClass,
}) {
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
}

// @todo: Присваеваем слушатели каждому инпуту в формах
function setEventListenets(
  formElement,
  inputSelector,
  inputErrorClass,
  submitButtonSelector,
  inactiveButtonClass
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, inputErrorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
}

// @todo: Очищаем формы от ошибок валидации при повторном открытии, блокируем кнопку если поля не валидны
export function clearValidation(
  formElement,
  { inputSelector, inputErrorClass, inactiveButtonClass, submitButtonSelector }
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    const formError = formElement.querySelector(`.${inputElement.id}_error`);
    hideInputError(inputElement, formError, inputErrorClass);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  });
}

// @todo: Показываем ошибку валидации
function showInputError(
  inputElement,
  errorElement,
  inputErrorClass,
  errorMessage
) {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
}

// @todo: Скрываем ошибки валидации
function hideInputError(inputElement, errorElement, inputErrorClass) {
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
}

// @todo: Проверяем валидность отдельного инпута
function checkInputValidity(formElement, inputElement, inputErrorClass) {
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
}

// @todo: Блокируем или делаем активной кнопку ввода, если хоть одно поле не валидно
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasValidInput(inputList)) {
    disableButton(buttonElement, inactiveButtonClass);
  } else {
    enableButton(buttonElement, inactiveButtonClass);
  }
}

// @todo: Проверяем валидность всех полей
function hasValidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// @todo: Активная кнопка
function enableButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}

// @todo: Заблокированная кнопка
function disableButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}
