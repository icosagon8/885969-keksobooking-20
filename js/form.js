'use strict';
(function () {
  var MIN_GUESTS = 0;
  var MAX_ROOMS_NUMBER = 100;
  var COORD_X = 603;
  var COORD_Y = 408;
  var COORD_Y_ACTIVE = 455;
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
  var coordinateX = COORD_X;
  var coordinateY = COORD_Y;

  var outputsCoordinate = function (ordinate, abscissa) {
    var coordinate = Math.round(ordinate) + ', ' + Math.round(abscissa);
    addressField.value = coordinate;
  };

  outputsCoordinate(coordinateX, coordinateY);

  coordinateY = COORD_Y_ACTIVE;

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

  var insertsInfoMessage = function (result, where, handler) {
    var template = document.querySelector('#' + result).content.querySelector('.' + result);
    var element = template.cloneNode(true);
    document.querySelector(where).insertAdjacentElement('afterbegin', element);
    document.addEventListener('keydown', handler);
    document.addEventListener('mousedown', handler);
    if (result === 'success') {
      window.main.deactivatesPage();
    }
  };

  var successHandler = function () {
    insertsInfoMessage('success', 'body', onSuccessMessageClickOrEscPress);
    window.map.closePopup();
  };

  var errorHandler = function () {
    insertsInfoMessage('error', 'main', onErrorMessageClickOrEscPress);
    window.map.closePopup();
  };

  var onSuccessMessageClickOrEscPress = function (evt) {
    if ((evt.key === 'Escape') || (evt.button === 0)) {
      evt.preventDefault();
      var success = document.querySelector('.success');
      success.remove();
      document.removeEventListener('keydown', onSuccessMessageClickOrEscPress);
      document.removeEventListener('mousedown', onSuccessMessageClickOrEscPress);
    }
  };

  var onErrorMessageClickOrEscPress = function (evt) {
    if ((evt.key === 'Escape') || (evt.button === 0)) {
      evt.preventDefault();
      var error = document.querySelector('.error');
      error.remove();
      document.removeEventListener('keydown', onErrorMessageClickOrEscPress);
      document.removeEventListener('mousedown', onErrorMessageClickOrEscPress);
    }
  };

  var submitHandler = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), successHandler, errorHandler);
  };

  var formReset = adForm.querySelector('.ad-form__reset');

  var onResetClick = function () {
    window.main.deactivatesPage();
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
    COORD_X: COORD_X,
    COORD_Y: COORD_Y,
    COORD_Y_ACTIVE: COORD_Y_ACTIVE,
    onResetClick: onResetClick,
    submitHandler: submitHandler,
    formReset: formReset

  };
})();
