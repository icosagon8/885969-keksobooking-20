'use strict';
(function () {
  var MapTypes = {
    PALACE: {
      'type': 'Дворец',
      'price': 10000
    },
    FLAT: {
      'type': 'Квартира',
      'price': 1000
    },
    HOUSE: {
      'type': 'Дом',
      'price': 5000
    },
    BUNGALO: {
      'type': 'Бунгало',
      'price': 0
    }
  };

  var addFeatures = function (features, element) {
    var featureList = element.querySelector('.popup__features');
    var fragment = document.createDocumentFragment();
    if (features.length > 0) {
      for (var i = 0; i < features.length; i++) {
        var cardFeatureElement = element.querySelector('.popup__feature--' + features[i]).cloneNode();
        fragment.append(cardFeatureElement);
      }
    } else {
      featureList.remove();
    }
    featureList.innerHTML = '';
    featureList.append(fragment);
  };

  var addPhotos = function (photos, element) {
    var popupPhotos = element.querySelector('.popup__photos');
    if (photos.length >= 1) {
      element.querySelector('.popup__photo').src = photos[0];
      for (var i = 1; i < photos.length; i++) {
        var cardImgElement = cardTemplate.querySelector('.popup__photo').cloneNode();
        cardImgElement.src = photos[i];
        popupPhotos.appendChild(cardImgElement);
      }
    } else {
      popupPhotos.remove();
    }
  };

  var addAvatar = function (avatar, element) {
    element.src = 'img/avatars/default.png';
    if (avatar) {
      element.src = avatar;
    }
  };

  var addTextContent = function (text, element) {
    var popupDescription = element.querySelector('.popup__description');
    if (text) {
      popupDescription.textContent = text;
    } else {
      popupDescription.remove();
    }
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

  var renderMapCard = function (ad) {
    var cardElement = cardTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = MapTypes[ad.offer.type.toUpperCase()].type;
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    addFeatures(ad.offer.features, cardElement);
    addTextContent(ad.offer.description, cardElement);
    addPhotos(ad.offer.photos, cardElement);
    var popupAvatar = cardElement.querySelector('.popup__avatar');
    addAvatar(ad.author.avatar, popupAvatar);
    cardElement.addEventListener('keydown', window.form.onPopupEscPress);
    var popupClose = cardElement.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      window.map.closePopup();
    });
    fragment.append(cardElement);
    return fragment;
  };

  window.card = {
    renderMapCard: renderMapCard,
    MapTypes: MapTypes,
    addAvatar: addAvatar
  };
})();
