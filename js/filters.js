'use strict';

(function () {
  var FILTERS = ['type', 'priceRange', 'rooms', 'guests'];
  var userFilters = {};
  var mapFilters = document.querySelector('.map__filters');
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingPriceSelect = document.querySelector('#housing-price');
  var housingRoomsSelect = document.querySelector('#housing-rooms');
  var housingGuestsSelect = document.querySelector('#housing-guests');
  var housingFeaturesSelect = document.querySelector('#housing-features');

  var parseIntValue = function (value) {
    if (value !== 'any') {
      value = parseInt(value, 10);
    }
    return value;
  };

  var Filters = function () {
    this.type = housingTypeSelect.value;
    this.priceRange = housingPriceSelect.value;
    this.rooms = parseIntValue(housingRoomsSelect.value);
    this.guests = parseIntValue(housingGuestsSelect.value);
    this.features = this.getFeatures();
  };

  Filters.prototype = {
    getFeatures: function () {
      var features = [];
      var featuresCollection = housingFeaturesSelect.querySelectorAll(':checked');

      featuresCollection.forEach(function (elem) {
        features.push(elem.value);
      });

      return features;
    }
  };

  mapFilters.addEventListener('change', function (evt) {
    window.main.closePopup();
    evt.target.focus();
    userFilters = new Filters();
    var dataArr = window.main.dataArr;
    var pins = window.main.pins;

    var CheckFilter = function (key) {
      for (var i = 0; i < dataArr.length; i++) {
        if (userFilters[key] !== dataArr[i][key] && userFilters[key] !== 'any') {
          pins[i].classList.add('hidden');
        }
      }
    };

    pins.forEach(function (pin) {
      pin.classList.remove('hidden');
    });

    FILTERS.forEach(CheckFilter);

    for (var i = 0; i < dataArr.length; i++) {
      userFilters.features.forEach(function (userFilter) {
        var matches = dataArr[i].features.some(function (filter) {
          return filter === userFilter;
        });
        if (!matches) {
          pins[i].classList.add('hidden');
        }
      });
    }
  });
})();
