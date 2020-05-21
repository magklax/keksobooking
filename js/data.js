'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  window.Data = function (data) {
    this.avatar = data.author.avatar;
    this.title = data.offer.title;
    this.address = data.offer.address;
    this.type = data.offer.type;
    this.price = data.offer.price;
    this.description = data.offer.description;
    this.coordX = data.location.x - PIN_WIDTH / 2 + 'px';
    this.coordY = data.location.y - PIN_HEIGHT + 'px';
    this.rooms = data.offer.rooms;
    this.guests = data.offer.guests;
    this.checkin = data.offer.checkin;
    this.checkout = data.offer.checkout;
    this.features = data.offer.features;
    this.photos = data.offer.photos;
    this.setTypeRu(data.offer.type);
    this.setPriceRange(data.offer.price);
  };

  window.Data.prototype = {
    getCapacity: function () {
      var END_CHAR1 = (this.rooms === 1) ? 'a' : 'ы';
      var END_CHAR2 = (this.guests === 1) ? 'я' : 'ей';
      return this.rooms + ' комнат' + END_CHAR1 + ' для ' + this.guests + ' гост' + END_CHAR2;
    },
    getTime: function () {
      return 'Заезд после ' + this.checkin + ', выезд до ' + this.checkout;
    },
    setTypeRu: function (type) {
      var types = {
        any: 'Любой тип жилья',
        flat: 'Квартира',
        bungalo: 'Бунгало',
        house: 'Дом',
        palace: 'Дворец'
      };
      this.typeRu = types[type];
    },
    setPriceRange: function (price) {
      switch(true) {
        case price >= 50000:
          this.priceRange = 'high';
          break;
        case price >= 10000:
          this.priceRange = 'middle';
          break;
        case price >= 0:
          this.priceRange = 'low';
            break;
      }
    }
  };
})();
