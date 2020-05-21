'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  window.utils = {
    isEnterKeycode: function (evt, func, params) {
      if (evt.keyCode === ENTER_KEYCODE) {
        func(params);
      }
    },
    isEscKeycode: function (evt, func, params) {
      if (evt.keyCode === ESC_KEYCODE) {
        func(params);
      }
    },
    createElements: function (container, callback, arr) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < arr.length; i++) {
        fragment.appendChild(callback(arr[i], i));
      }
      container.appendChild(fragment);
    },
    hideElement: function (elem) {
      elem.classList.add('hidden');
    },
    showElement: function (elem) {
      elem.classList.remove('hidden');
    },
    preventDefault: function (evt) {
      evt.preventDefault();
    },
    /*  trapFocus: function (firtsElem, lastElem) {
      lastElem.addEventListener('blur', function () {
        firtsElem.focus();
      });
    }*/
  };
})();
