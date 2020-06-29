'use strict';
(function () {
  var START_LEFT = '570px';
  var START_TOP = '373px';
  var switchDisabled = window.util.switchDisabled;
  var mapPinMain = window.form.mapPinMain;

  var activatesPage = function () {
    window.form.map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    switchDisabled(window.form.adFormFieldset, false);
    switchDisabled(window.form.mapFiltersSelect, false);
    switchDisabled(window.form.mapFiltersFieldset, false);
    window.form.coordinateX = window.form.COORD_X;
    window.form.coordinateY = window.form.COORD_Y_ACTIVE;
    window.form.outputsCoordinate(window.form.coordinateX, window.form.coordinateY);
    window.backend.load(window.map.successHandler, window.util.errorHandler);
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
    window.form.adForm.addEventListener('submit', window.form.submitHandler);
    window.form.formReset.addEventListener('click', window.form.onResetClick);
    window.map.housingType.addEventListener('change', window.map.onHousingTypeClick);
  };

  var deactivatesPage = function () {
    window.form.map.classList.add('map--faded');
    window.form.adForm.classList.add('ad-form--disabled');
    window.map.deletePins();
    switchDisabled(window.form.adFormFieldset, true);
    switchDisabled(window.form.mapFiltersSelect, true);
    switchDisabled(window.form.mapFiltersFieldset, true);
    window.form.mapPinMain.addEventListener('mousedown', onMapPinMainClickOrPress);
    window.form.mapPinMain.addEventListener('keydown', onMapPinMainClickOrPress);
    window.form.adForm.reset();
    var coordinateX = window.form.COORD_X;
    var coordinateY = window.form.COORD_Y;
    window.form.outputsCoordinate(coordinateX, coordinateY);
    mapPinMain.style.top = START_TOP;
    mapPinMain.style.left = START_LEFT;
    window.form.adForm.removeEventListener('submit', window.form.submitHandler);
    window.form.formReset.removeEventListener('click', window.form.onResetClick);
    window.map.housingType.removeEventListener('change', window.map.onHousingTypeClick);
  };

  var onMapPinMainClickOrPress = function (evt) {
    if (evt.button === 0 || (evt.key === 'Enter')) {
      activatesPage();
    }
  };

  window.form.mapPinMain.addEventListener('mousedown', onMapPinMainClickOrPress);
  window.form.mapPinMain.addEventListener('keydown', onMapPinMainClickOrPress);

  window.main = {
    deactivatesPage: deactivatesPage
  };
})();
