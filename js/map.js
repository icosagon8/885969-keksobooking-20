'use strict';
(function () {
  var NUMBER_OF_ADS = 5;
  var mapPinsElement = document.querySelector('.map__pins');

  var onMapPinClick = function (mapPin, ad) {
    mapPin.addEventListener('click', function () {
      openPopup(ad);
    });
  };

  var successHandler = function (ads) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < NUMBER_OF_ADS; i++) {
      var mapPin = window.pin.renderMapPin(ads[i]);
      onMapPinClick(mapPin, ads[i]);
      fragment.appendChild(mapPin);
    }
    mapPinsElement.appendChild(fragment);
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
    if (popup) {
      popup.remove();
    }
    document.removeEventListener('keydown', onPopupEscPress);
  };

  window.map = {
    successHandler: successHandler,
    openPopup: openPopup,
    onPopupEscPress: onPopupEscPress,
    closePopup: closePopup
  };
})();
