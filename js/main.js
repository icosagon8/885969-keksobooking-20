'use strict';
(function () {
  var START_LEFT = '570px';
  var START_TOP = '373px';
  var PRICE_VALUE = '1000';
  var switchDisabled = window.util.switchDisabled;
  var mapPinMain = window.form.mapPinMain;
  var price = window.form.adForm.querySelector('#price');
  var type = window.form.adForm.querySelector('#type');

  var activatesPage = function () {
    window.form.map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.coordinateX = window.form.COORD_X;
    window.form.coordinateY = window.form.COORD_Y_ACTIVE;
    window.form.outputsCoordinate(window.form.coordinateX, window.form.coordinateY);
    window.backend.load(window.map.successHandler, window.util.errorHandler);
    switchDisabled(window.form.adFormFieldset, false);
    switchDisabled(window.form.mapFiltersSelect, false);
    switchDisabled(window.form.mapFiltersFieldset, false);
    window.form.validatesForm(window.form.roomNumber);
    window.form.validatesForm(window.form.capacity);
    window.form.mapPinMain.removeEventListener('mousedown', onMapPinMainClickOrPress);
    window.form.mapPinMain.removeEventListener('keydown', onMapPinMainClickOrPress);
    window.map.mapFilters.reset();
    window.form.synchronizesTimes();
    type.addEventListener('change', function () {
      price.setAttribute('min', window.card.HousingMap[type.value.toUpperCase()].price);
      price.setAttribute('placeholder', window.card.HousingMap[type.value.toUpperCase()].price);
    });
    window.form.adForm.addEventListener('submit', window.form.onSubmitClick);
    window.form.formReset.addEventListener('click', window.form.onResetClick);
    window.map.mapFilters.addEventListener('change', window.map.onFiltersChange);
    window.photoUploader.previewChooser.addEventListener('change', window.photoUploader.onPreviewChooserChange);
    window.photoUploader.housingPhotoChooser.addEventListener('change', window.photoUploader.onHousingPhotoChooserChange);
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
    price.setAttribute('min', PRICE_VALUE);
    price.setAttribute('placeholder', PRICE_VALUE);
    window.form.adForm.removeEventListener('submit', window.form.onSubmitClick);
    window.form.formReset.removeEventListener('click', window.form.onResetClick);
    window.map.mapFilters.removeEventListener('change', window.map.onFiltersChange);
    window.photoUploader.previewChooser.removeEventListener('change', window.photoUploader.onPreviewChooserChange);
    window.photoUploader.housingPhotoChooser.removeEventListener('change', window.photoUploader.onHousingPhotoChooserChange);
    window.photoUploader.preview.src = 'img/muffin-grey.svg';
    window.photoUploader.removeImage();
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
