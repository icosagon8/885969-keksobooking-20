'use strict';
(function () {
  var MIN_GUESTS = 0;
  var MAX_ROOMS_NUMBER = 100;
  var MAP_PIN_MAIN_ANGLE_HEIGHT = 15;
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

  var outputsCoordinate = function (ordinate, abscissa) {
    var coordinate = Math.round(ordinate) + ', ' + Math.round(abscissa);
    addressField.value = coordinate;
  };

  outputsCoordinate(coordinateX, coordinateY);

  var mapPinMainHeight = mapPinMain.offsetHeight + MAP_PIN_MAIN_ANGLE_HEIGHT;
  coordinateY = mapPinMain.offsetTop + mapPinMainHeight;

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
    coordinateX: coordinateX,
    coordinateY: coordinateY,
    mapPinMain: mapPinMain,
    roomNumber: roomNumber,
    capacity: capacity,
    MAP_PIN_MAIN_ANGLE_HEIGHT: MAP_PIN_MAIN_ANGLE_HEIGHT,
    mapPinMainHeight: mapPinMainHeight
  };
})();
