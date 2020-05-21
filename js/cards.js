'use strict';

(function () {
  var STR1 = '.popup__';
  var STR2 = '.popup__text--';

  var getFeaturesList = function () {
    var arr = [];

    window.main.featuresList.forEach(function (feature) {
      arr.push(feature.classList.value.match(/--(.*)/)[1]);
    });

    return arr;
  };

  var createPhotos = function (array, elemNode, container) {
    var fragment = document.createDocumentFragment();

    array.forEach(function (photo) {
      var photoElement = elemNode.cloneNode(true);
      photoElement.src = photo;
      fragment.appendChild(photoElement);
    });

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    container.appendChild(fragment);
  };

  var renderSimilarCard = function (obj, index, elemNode) {
    var popupPhotos = document.querySelector('.popup__photos');

    elemNode.querySelector(STR1 + 'avatar').src = obj.avatar;
    elemNode.querySelector(STR1 + 'title').textContent = obj.title;
    elemNode.querySelector(STR2 + 'address').textContent = obj.address;
    elemNode.querySelector(STR2 + 'price').textContent = obj.price;
    elemNode.querySelector(STR1 + 'type').textContent = obj.typeRu;
    elemNode.querySelector(STR2 + 'capacity').textContent = obj.getCapacity();
    elemNode.querySelector(STR1 + 'description').textContent = obj.description;
    elemNode.querySelector(STR2 + 'time').textContent = obj.getTime();

    //  отображаем доступные удобства
    window.main.featuresList.forEach(function (feature) {
      feature.classList.remove('visually-hidden');
    });

    getFeaturesList().forEach(function (feature) {
      if (!obj.features.includes(feature)) {
        elemNode.querySelector(STR1 + 'feature--' + feature).classList.add('visually-hidden');
      }
    });

    //  отображаем доступные фотографии жилья
    if (obj.photos.length) {
      popupPhotos.classList.remove('visually-hidden');
      createPhotos(obj.photos, popupPhotos.querySelector('img'), popupPhotos);
    } else {
      popupPhotos.classList.add('visually-hidden');
    }

    return elemNode;
  };

  window.cards = {
    render: renderSimilarCard
  };

})();
