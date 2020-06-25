'use strict';
(function () {
  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderMapPin = function (ad) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.style.left = ad.location.x - MAP_PIN_WIDTH / 2 + 'px';
    mapPinElement.style.top = ad.location.y - MAP_PIN_HEIGHT + 'px';
    var mapPinImg = mapPinElement.querySelector('img');
    window.card.addAvatar(ad.author.avatar, mapPinImg);
    mapPinImg.alt = ad.offer.title;
    return mapPinElement;
  };

  window.pin = {
    renderMapPin: renderMapPin
  };
})();


