'use strict';

(function () {
  var userAddress = document.querySelector('#address');

  var PIN_MIN_LEFT = window.main.map.offsetLeft;
  var PIN_MAX_LEFT = window.main.map.offsetWidth + window.main.map.offsetLeft - window.main.mainPin.offsetWidth;
  var PIN_MIN_TOP = 150 - window.main.mainPin.offsetHeight;
  var PIN_MAX_TOP = 670 - window.main.mainPin.offsetHeight;

  var limitCoord = function (coord, minCoord, maxCoord) {
    if (coord < minCoord) {
      coord = minCoord;
    } else if (coord > maxCoord) {
      coord = maxCoord;
    }
    return coord;
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var pinCoord = {
        left: limitCoord((window.main.mainPin.offsetLeft - shift.x), PIN_MIN_LEFT, PIN_MAX_LEFT),
        top: limitCoord((window.main.mainPin.offsetTop - shift.y), PIN_MIN_TOP, PIN_MAX_TOP)
      };

      userAddress.value = pinCoord.left + ', ' + pinCoord.top;

      window.main.mainPin.style.left = pinCoord.left + 'px';
      window.main.mainPin.style.top = pinCoord.top + 'px';

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.main.activatePage();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.dnd = {
    onMouseDown: onMouseDown
  };

})();

