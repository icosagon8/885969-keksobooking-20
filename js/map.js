'use strict';
(function () {
  var NUMBER_OF_ADS = 5;
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;
  var mapPins = document.querySelector('.map__pins');

  var onMapPinClick = function (mapPin, ad) {
    mapPin.addEventListener('click', function () {
      openPopup(mapPin, ad);
    });
  };

  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var removeMapPinActiveClass = function () {
    var mapPinActive = document.querySelector('.map__pin--active');
    if (mapPinActive) {
      mapPinActive.classList.remove('map__pin--active');
    }
  };

  var openPopup = function (mapPin, ad) {
    var popup = window.form.map.querySelector('.popup');
    if (popup !== null) {
      popup.remove();
      removeMapPinActiveClass();
    }
    window.form.map.insertBefore(window.card.renderMapCard(ad), mapFiltersContainer);
    document.addEventListener('keydown', onPopupEscPress);
    mapPin.classList.add('map__pin--active');
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };

  var closePopup = function () {
    var popup = window.form.map.querySelector('.popup');
    removeMapPinActiveClass();
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

  var getTypeFlag = function (ad) {
    var isType = true;
    if (housingType.value !== 'any') {
      isType = ad.offer.type === housingType.value;
    }
    return isType;
  };
  var getPriceFlag = function (ad) {
    var isPrice = true;
    if (housingPrice.value !== 'any') {
      isPrice = getPriceValue(ad) === housingPrice.value;
    }
    return isPrice;
  };
  var getRoomsFlag = function (ad) {
    var isRooms = true;
    if (housingRooms.value !== 'any') {
      isRooms = ad.offer.rooms === parseInt(housingRooms.value, 10);
    }
    return isRooms;
  };
  var getGuestsFlag = function (ad) {
    var isGuests = true;
    if (housingGuests.value !== 'any') {
      isGuests = ad.offer.guests === parseInt(housingGuests.value, 10);
    }
    return isGuests;
  };
  var getFeaturesFlag = function (ad) {
    var checkedFeatures = housingFeatures.querySelectorAll('input:checked');
    var isFeatures = true;
    checkedFeatures.forEach(function (checkedFeature) {
      isFeatures = isFeatures && ad.offer.features.includes(checkedFeature.value);
    });
    return isFeatures;
  };

  var updateMapPins = function () {
    var filteredAds = data.filter(function (ad) {
      return getTypeFlag(ad) && getPriceFlag(ad) && getRoomsFlag(ad) && getGuestsFlag(ad) && getFeaturesFlag(ad);
    });

    var takeNumber = filteredAds.length > NUMBER_OF_ADS ? NUMBER_OF_ADS : filteredAds.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      var mapPin = window.pin.renderMapPin(filteredAds[i]);
      onMapPinClick(mapPin, filteredAds[i]);
      fragment.appendChild(mapPin);
    }
    mapPins.appendChild(fragment);
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
