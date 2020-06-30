'use strict';
(function () {
  var NUMBER_OF_ADS = 5;
  var mapPinsElement = document.querySelector('.map__pins');

  var onMapPinClick = function (mapPin, ad) {
    mapPin.addEventListener('click', function () {
      openPopup(ad);
    });
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

  var typeOfHousing = 'any';
  var data = [];

  var updateMapPins = function () {
    var filteredAds = data.slice().filter(function (filteredAd) {
      return filteredAd.offer.type === typeOfHousing;
    });
    var takeNumber = filteredAds.length > NUMBER_OF_ADS ? NUMBER_OF_ADS : filteredAds.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      var mapPin = window.pin.renderMapPin(filteredAds[i]);
      onMapPinClick(mapPin, filteredAds[i]);
      fragment.appendChild(mapPin);
    }
    mapPinsElement.appendChild(fragment);
  };

  var onTypeChange = function (type) {
    typeOfHousing = type;
    updateMapPins();
  };

  var successHandler = function (ads) {
    data = ads;
    updateMapPins();
    deletePins();
    window.map.housingType.value = 'any';
  };

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');

  var deletePins = function () {
    var pins = window.form.map.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  var onHousingTypeClick = function () {
    deletePins();
    var newType = housingType.value;
    onTypeChange(newType);
    closePopup();
  };

  window.map = {
    successHandler: successHandler,
    openPopup: openPopup,
    onPopupEscPress: onPopupEscPress,
    closePopup: closePopup,
    deletePins: deletePins,
    onHousingTypeClick: onHousingTypeClick,
    housingType: housingType
  };
})();
