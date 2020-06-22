'use strict';
(function () {
  var NUMBER_OF_ADS = 10;
  var mapPinsElement = document.querySelector('.map__pins');

  var onMapPinClick = function (mapPin, ad) {
    mapPin.addEventListener('click', function () {
      openPopup(ad);
    });
  };

  var successHandler = function (ads) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < NUMBER_OF_ADS; i++) {
      fragment.appendChild(window.pin.renderMapPin(ads[i]));
    }
    mapPinsElement.appendChild(fragment);

    for (var j = 0; j < window.map.NUMBER_OF_ADS; j++) {
      onMapPinClick(window.map.mapPinsElement.children[j + 2], ads[j]);
    }
  };

  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var openPopup = function (ad) {
    var popup = window.form.map.querySelector('.popup');
    if (popup !== null) {
      popup.remove();
    }
    window.form.map.insertBefore(window.card.renderMapCard(ad), mapFiltersContainer);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };

  var closePopup = function () {
    var popup = window.form.map.querySelector('.popup');
    popup.remove();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  window.map = {
    successHandler: successHandler,
    mapPinsElement: mapPinsElement,
    NUMBER_OF_ADS: NUMBER_OF_ADS,
    openPopup: openPopup,
    onPopupEscPress: onPopupEscPress,
    closePopup: closePopup
  };
})();
