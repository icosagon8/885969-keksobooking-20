'use strict';
(function () {
  var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var shuffleArray = function (array) {
    var j;
    var temp;
    var arr = array.slice();

    for (var i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  var switchDisabled = function (elements, bool) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = bool;
    }
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    shuffleArray: shuffleArray,
    switchDisabled: switchDisabled
  };
})();
