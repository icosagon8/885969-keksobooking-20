'use strict';
(function () {
  var NUMBER_OF_ADS = 5;
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;
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

  var data = [];
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');

  var getPriceValue = function (ad) {
    var price;
    if (ad.offer.price < MIN_PRICE) {
      price = 'low';
    } else if ((ad.offer.price >= MIN_PRICE) && (ad.offer.price <= MAX_PRICE)) {
      price = 'middle';
    } else if (ad.offer.price > MAX_PRICE) {
      price = 'high';
    }
    return price;
  };

  var updateMapPins = function () {
    var filteredAds = data.filter(function (ad) {
      var filteredPins = ad.offer.type;
      if (housingType.value !== 'any') {
        filteredPins = (ad.offer.type === housingType.value);
      }
      if (housingPrice.value !== 'any') {
        filteredPins = filteredPins && (getPriceValue(ad) === housingPrice.value);
      }
      if (housingRooms.value !== 'any') {
        filteredPins = filteredPins && (ad.offer.rooms.toString() === housingRooms.value);
      }
      if (housingGuests.value !== 'any') {
        filteredPins = filteredPins && (ad.offer.guests.toString() === housingGuests.value);
      }

      var checkedFeatures = housingFeatures.querySelectorAll('input:checked');
      var checkedFeaturesArray = [];
      checkedFeatures.forEach(function (checkedFeature) {
        checkedFeaturesArray.push(checkedFeature.value);
      });

      if (checkedFeaturesArray.length !== 0) {
        checkedFeaturesArray.forEach(function (checkedFeaturesItem) {
          filteredPins = filteredPins && (ad.offer.features.includes(checkedFeaturesItem));
        });
      }
      return filteredPins;
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

  var successHandler = function (ads) {
    data = ads;
    updateMapPins();
  };

  var deletePins = function () {
    var pins = window.form.map.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  var onFiltersChange = window.debounce(function () {
    deletePins();
    closePopup();
    updateMapPins();
  });

  window.map = {
    successHandler: successHandler,
    openPopup: openPopup,
    onPopupEscPress: onPopupEscPress,
    closePopup: closePopup,
    deletePins: deletePins,
    mapFilters: mapFilters,
    onFiltersChange: onFiltersChange
  };
})();
