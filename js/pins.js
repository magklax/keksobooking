'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderPinElement = function (obj, index) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.dataset.index = index;
    pinElement.tabIndex = '1';
    pinElement.style.left = obj.coordX;
    pinElement.style.top = obj.coordY;
    pinElement.firstChild.src = obj.avatar;
    pinElement.firstChild.alt = obj.title;

    window.utils.hideElement(pinElement);

    return pinElement;
  };

  window.pins = {
    render: renderPinElement
  };
})();
