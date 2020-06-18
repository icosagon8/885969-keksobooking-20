'use strict';
(function () {
  var MIN_GUESTS = 0;
  var MAX_ROOMS_NUMBER = 100;
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var switchDisabled = window.util.switchDisabled;

  switchDisabled(adFormFieldset, true);

  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters');
  var mapFiltersSelect = mapFilters.querySelectorAll('select');

  switchDisabled(mapFiltersSelect, true);

  var mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');

  switchDisabled(mapFiltersFieldset, true);

  var mapPinMain = map.querySelector('.map__pin--main');
  var addressField = adForm.querySelector('#address');

  var coordinateX = mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2;
  var coordinateY = mapPinMain.offsetTop + mapPinMain.offsetHeight / 2;

  var outputsCoordinate = function () {
    var coordinate = Math.round(coordinateX) + ', ' + Math.round(coordinateY);
    addressField.value = coordinate;
  };

  outputsCoordinate();

  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');

  var validatesForm = function (element) {
    element.addEventListener('change', function () {
      if ((+roomNumber.value !== MAX_ROOMS_NUMBER) && (+capacity.value === MIN_GUESTS)) {
        capacity.setCustomValidity('Выберите хотя бы 1 гостя');
      } else if ((+roomNumber.value === MAX_ROOMS_NUMBER) && (+capacity.value !== MIN_GUESTS)) {
        capacity.setCustomValidity('Комнаты не для гостей!');
      } else if (+roomNumber.value < +capacity.value) {
        capacity.setCustomValidity('Слишком много гостей!');
      } else {
        capacity.setCustomValidity('');
      }
    });
  };

  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var elementTime = adForm.querySelector('.ad-form__element--time');

  var synchronizesTimes = function () {
    elementTime.addEventListener('change', function (evt) {
      timeIn.value = evt.target.value;
      timeOut.value = evt.target.value;
    });
  };

  window.form = {
    validatesForm: validatesForm,
    synchronizesTimes: synchronizesTimes,
    outputsCoordinate: outputsCoordinate,
    map: map,
    adForm: adForm,
    adFormFieldset: adFormFieldset,
    mapFiltersSelect: mapFiltersSelect,
    mapFiltersFieldset: mapFiltersFieldset,
    coordinateY: coordinateY,
    mapPinMain: mapPinMain,
    roomNumber: roomNumber,
    capacity: capacity
  };
})();
