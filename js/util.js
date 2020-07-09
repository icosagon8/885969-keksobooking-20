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

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: rgba(245, 64, 64, 0.8); color: #ffffff; padding: 30px 10px; width: 900px; border: 2px solid red;';
    node.style.position = 'fixed';
    node.style.top = '30%';
    node.style.left = '0';
    node.style.right = '0';
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    shuffleArray: shuffleArray,
    switchDisabled: switchDisabled,
    errorHandler: errorHandler
  };
})();
