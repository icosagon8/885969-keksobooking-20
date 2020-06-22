'use strict';
(function () {
  var MIN_COORDINAT_X = 0;
  var MAX_COORDINAT_X = 1200;
  var MIN_COORDINAT_Y = 130;
  var MAX_COORDINAT_Y = 630;
  var mapPinMain = window.form.mapPinMain;

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      window.form.coordinateX -= shift.x;

      var holdsMapPinMainOnX = function (x) {
        window.form.coordinateX = x;
        mapPinMain.style.left = (x - mapPinMain.offsetWidth / 2) + 'px';
      };

      var holdsMapPinMainOnY = function (y) {
        window.form.coordinateY = y;
        mapPinMain.style.top = (y - window.form.mapPinMainHeight) + 'px';
      };

      if (mapPinMain.offsetLeft <= MIN_COORDINAT_X - mapPinMain.offsetWidth / 2) {
        holdsMapPinMainOnX(MIN_COORDINAT_X);
      } else if (mapPinMain.offsetLeft >= MAX_COORDINAT_X - mapPinMain.offsetWidth / 2) {
        holdsMapPinMainOnX(MAX_COORDINAT_X);
      }

      window.form.coordinateY -= shift.y;

      if (mapPinMain.offsetTop <= MIN_COORDINAT_Y - window.form.mapPinMainHeight) {
        holdsMapPinMainOnY(MIN_COORDINAT_Y);
      } else if (mapPinMain.offsetTop >= MAX_COORDINAT_Y - window.form.mapPinMainHeight) {
        holdsMapPinMainOnY(MAX_COORDINAT_Y);
      }

      window.form.outputsCoordinate(window.form.coordinateX, window.form.coordinateY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.outputsCoordinate(window.form.coordinateX, window.form.coordinateY);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
