'use strict';

(function () {
  var userTitle = document.querySelector('#title');
  var userPrice = document.querySelector('#price');
  var userType = document.querySelector('#type');
  var userTimein = document.querySelector('#timein');
  var userTimeout = document.querySelector('#timeout');
  var userRoomNumber = document.querySelector('#room_number');
  var userCapacity = document.querySelector('#capacity');

  var onUserTitleBlur = function (evt) {
    evt.preventDefault();

    var target = evt.target;
    if (target.validity.valueMissing) {
      target.setCustomValidity('Введите заголовок объявления');
    } else if (target.validity.tooShort) {
      target.setCustomValidity('Длина заголовка объявления дожна быть не менее 30 символов');
    } else if (target.validity.tooLong) {
      target.setCustomValidity('Длина заголовка объявления дожна быть не более 100 символов');
    } else {
      target.setCustomValidity('');
    }
  };

  var onTypeChange = function () {
    var minPrice;
    switch (userType.value) {
      case 'bungalo':
        minPrice = 0;
        break;
      case 'house':
        minPrice = 5000;
        break;
      case 'palace':
        minPrice = 10000;
        break;
      default:
        minPrice = 1000;
    }
    userPrice.min = minPrice;
    userPrice.placeholder = minPrice;
  };

  var onUserPriceBlur = function (evt) {
    evt.preventDefault();

    var target = evt.target;
    if (target.validity.typeMismatch) {
      target.setCustomValidity('Введите числовое значение');
    } else if (target.validity.valueMissing) {
      target.setCustomValidity('Укажите цену за одну ночь');
    } else if (target.validity.rangeOverflow) {
      target.setCustomValidity('Цена за одну ночь не должна превышать 1 000 000 рублей');
    } else if (target.validity.rangeUnderflow) {
      target.setCustomValidity('Цена за одну ночь не должна быть ниже ' + target.min + ' рублей');
    } else {
      target.setCustomValidity('');
    }
  };

  var onTimeChange = function (evt) {
    var target = evt.target;

    if (target === userTimein) {
      userTimeout.value = target.value;
    } else {
      userTimein.value = target.value;
    }
  };

  var toggleOption = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      userCapacity.querySelector('option[value="' + i + '"]').hidden = arr[i];
    }
  };

  var onCapacityChange = function (evt) {
    var target = evt.target;

    if (target === userRoomNumber) {
      switch (target.value) {
        case '1':
          userCapacity.value = '1';
          toggleOption([true, false, true, true]);
          break;
        case '2':
          userCapacity.value = '2';
          toggleOption([true, false, false, true]);
          break;
        case '3':
          userCapacity.value = '3';
          toggleOption([true, false, false, false]);
          break;
        default:
          userCapacity.value = '0';
          toggleOption([false, true, true, true]);
      }
    }
  };

  userTitle.addEventListener('blur', onUserTitleBlur);
  userType.addEventListener('change', onTypeChange);
  userPrice.addEventListener('blur', onUserPriceBlur);
  userTimein.addEventListener('change', onTimeChange);
  userTimeout.addEventListener('change', onTimeChange);
  userRoomNumber.addEventListener('change', onCapacityChange);

})();
