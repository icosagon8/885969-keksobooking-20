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
    for (var i = 0; i < features.length; i++) {
      var cardFeatureElement = element.querySelector('.popup__feature--' + features[i]).cloneNode();
      fragment.append(cardFeatureElement);
    }
    featureList.innerHTML = '';
    featureList.append(fragment);
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
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    if (ad.offer.photos.length >= 1) {
      cardElement.querySelector('.popup__photo').src = ad.offer.photos[0];
      for (var i = 1; i < ad.offer.photos.length; i++) {
        var cardImgElement = cardTemplate.querySelector('.popup__photo').cloneNode();
        cardImgElement.src = ad.offer.photos[i];
        cardElement.querySelector('.popup__photos').appendChild(cardImgElement);
      }
    }
    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
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
    MapTypes: MapTypes
  };
})();
