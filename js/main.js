'use strict';
(function () {
  var switchDisabled = window.util.switchDisabled;

  var activatesPage = function () {
    window.form.map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    switchDisabled(window.form.adFormFieldset, false);
    switchDisabled(window.form.mapFiltersSelect, false);
    switchDisabled(window.form.mapFiltersFieldset, false);
    window.form.outputsCoordinate(window.form.coordinateX, window.form.coordinateY);
    window.map.drawAd();
    var mapPins = window.map.mapPinsElement.querySelectorAll('button:not(.map__pin--main)');

    var onMapPinClick = function (mapPin, ad) {
      mapPin.addEventListener('click', function () {
        window.map.openPopup(ad);
      });
    };

    for (var i = 0; i < window.map.ads.length; i++) {
      onMapPinClick(mapPins[i], window.map.ads[i]);
    }

    window.form.validatesForm(window.form.roomNumber);
    window.form.validatesForm(window.form.capacity);

    window.form.mapPinMain.removeEventListener('mousedown', onMapPinMainClickOrPress);
    window.form.mapPinMain.removeEventListener('keydown', onMapPinMainClickOrPress);

    window.form.synchronizesTimes();

    var type = window.form.adForm.querySelector('#type');
    var price = window.form.adForm.querySelector('#price');

    type.addEventListener('change', function () {
      price.setAttribute('min', window.card.MapTypes[type.value.toUpperCase()].price);
      price.setAttribute('placeholder', window.card.MapTypes[type.value.toUpperCase()].price);
    });
  };

  var onMapPinMainClickOrPress = function (evt) {
    if (evt.button === 0 || (evt.key === 'Enter')) {
      activatesPage();
    }
  };

  window.form.mapPinMain.addEventListener('mousedown', onMapPinMainClickOrPress);
  window.form.mapPinMain.addEventListener('keydown', onMapPinMainClickOrPress);
})();
