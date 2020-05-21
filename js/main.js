'use strict';

(function () {
  var PIN_LEFT = '570px';
  var PIN_TOP = '375px';
  var dataArr = [];
  var form = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var pinsList = document.querySelector('.map__pins');
  var userAvatar = document.querySelector('.ad-form-header__preview img');
  var defaultAvatar = userAvatar.src;
  var userImageContainer = document.querySelector('.ad-form__photo-container');

  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  document.querySelector('.map').appendChild(cardTemplate);

  var popup = document.querySelector('.popup');
  var popupClose = document.querySelector('.popup__close');
  var featuresList = popup.querySelectorAll('.popup__feature');

  var onSuccessHandler = function (data) {
    data.forEach(function (elem) {
      var newCard = new window.Data(elem);
      dataArr.push(newCard);
    });

    window.utils.createElements(pinsList, window.pins.render, dataArr);

    window.main.pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.main.dataArr = dataArr;

    mainPin.addEventListener('mousedown', window.dnd.onMouseDown);
  };

  var onErrorHandler = function (message) {
    throw new Error(message);
  };

  window.backend.load(onSuccessHandler, onErrorHandler);

  var resetUserImages = function () {
    var images = userImageContainer.querySelectorAll('.ad-form__photo');
    images[0].classList.remove('visually-hidden');
    images[0].querySelector('img').removeAttribute('src');

    for (var i = 1; i < images.length; i++) {
      images[i].parentNode.removeChild(images[i]);
    }
  };

  var disableForm = function (collection, boolean) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].disabled = boolean;
    }
  };

  disableForm(form.elements, true);

  var resetForm = function () {
    mainPin.style.left = PIN_LEFT;
    mainPin.style.top = PIN_TOP;
    userAvatar.src = defaultAvatar;
    resetUserImages();
    form.reset();
    form.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
    closePopup();
    window.main.pins.forEach(window.utils.hideElement);
    disableForm(form.elements, true);
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    window.main.pins.forEach(window.utils.showElement);
    form.classList.remove('ad-form--disabled');

    disableForm(form.elements, false);
  };

  var removeActiveClass = function () {
    window.main.pins.forEach(function (pin) {
      pin.classList.remove('map__pin--active');
    });
  };

  var onPopupEcsPress = function (evt) {
    window.utils.isEscKeycode(evt, closePopup);
  };

  var onNotPopupClick = function (evt) {
    if (evt.target.tagName !== 'BUTTON' && evt.target.tagName !== 'IMG'
      && evt.target.parentNode !== popup && evt.target !== popup) {
      closePopup();
    }
  };

  var closePopup = function () {
    window.utils.hideElement(popup);

    document.removeEventListener('keydown', onPopupEcsPress);
    map.removeEventListener('click', onNotPopupClick);

    if (document.querySelector(('.map__pin--active'))) {
      document.querySelector(('.map__pin--active')).focus();
    }
  };

  var openPopup = function (elem) {
    if (elem.classList.contains('map__pin--active')) {
      closePopup();
    } else {
      removeActiveClass();
      elem.classList.add('map__pin--active');

      window.cards.render(dataArr[elem.dataset.index], elem, popup);
      window.utils.showElement(popup);

      document.addEventListener('keydown', onPopupEcsPress);
      pinsList.addEventListener('click', onNotPopupClick);
      popupClose.focus();
    }
  };

  pinsList.addEventListener('click', function (evt) {
    var target = evt.target.closest('button:not(.map__pin--main)');

    if (target) {
      openPopup(target);
    }
  });

  pinsList.addEventListener('keydown', function (evt) {
    var target = evt.target;

    if (target.type === 'button') {
      window.utils.isEnterKeycode(openPopup, target);
    }
  });

  popupClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    closePopup();
  });

  popupClose.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    window.utils.isEnterKeycode(evt, closePopup);
  });

  window.main = {
    form: form,
    map: map,
    popup: popup,
    closePopup: closePopup,
    mainPin: mainPin,
    userAvatar: userAvatar,
    featuresList: featuresList,
    userImageContainer: userImageContainer,
    resetForm: resetForm,
    activatePage: activatePage,
  };
})();
