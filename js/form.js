'use strict';

(function () {
  var successMessageTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

  var errorMessageTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

  window.main.form.appendChild(successMessageTemplate);
  window.main.form.appendChild(errorMessageTemplate);

  var successMessage = document.querySelector('.success');
  var errorMessage = document.querySelector('.error');
  var errorButton = document.querySelector('.error__button');
  var resetButton = document.querySelector('.ad-form__reset');

  window.utils.hideElement(successMessage);
  window.utils.hideElement(errorMessage);

  var onSuccessMessageEscPress = function (evt) {
    window.utils.isEscKeycode(evt, hideSuccessMessage);
  };

  var onSuccessMessageClick = function () {
    hideSuccessMessage();
  };

  var onErrorMessageEscPress = function (evt) {
    window.utils.isEscKeycode(evt, hideErrorMessage);
  };

  var onErrorButtonClick = function (evt) {
    evt.preventDefault();
    hideErrorMessage();
  };

  var onErrorButtonEnterPress = function (evt) {
    evt.preventDefault();
    window.utils.isEnterKeycode(evt, hideErrorMessage);
  };

  var showSuccessMessage = function () {
    window.utils.showElement(successMessage);

    document.addEventListener('keydown', onSuccessMessageEscPress);
    document.addEventListener('click', onSuccessMessageClick);
  };

  var hideSuccessMessage = function () {
    window.utils.hideElement(successMessage);
    window.main.resetForm();

    document.removeEventListener('keydown', onSuccessMessageEscPress);
    document.removeEventListener('click', onSuccessMessageClick);
  };

  var showErrorMessage = function () {
    window.utils.showElement(errorMessage);

    document.addEventListener('keydown', onErrorMessageEscPress);
    errorButton.focus();
    errorButton.addEventListener('click', onErrorButtonClick);
    errorButton.addEventListener('keydown', onErrorButtonEnterPress);
  };

  var hideErrorMessage = function () {
    window.utils.hideElement(errorMessage);

    document.removeEventListener('keydown', onErrorMessageEscPress);
  };

  window.main.form.addEventListener('submit', function (evt) {
    window.backend.post(new FormData(evt.target), showSuccessMessage, showErrorMessage);

    evt.preventDefault();
  });

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();

    window.main.resetForm();
  });
})();
