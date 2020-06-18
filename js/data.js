'use strict';
(function () {
  var MIN_COORDINAT_X = 0;
  var MAX_COORDINAT_X = 1200;
  var MIN_COORDINAT_Y = 130;
  var MAX_COORDINAT_Y = 630;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 5000;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS = 4;
  var TIMES = ['12:00', '13:00', '14:00'];
  var SERVICES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MAX_GUESTS = 8;

  var getRandomNumber = window.util.getRandomNumber;

  var generatesAds = function (quantity) {
    var ads = [];
    for (var i = 1; i <= quantity; i++) {
      var locationX = getRandomNumber(MIN_COORDINAT_X, MAX_COORDINAT_X);
      var locationY = getRandomNumber(MIN_COORDINAT_Y, MAX_COORDINAT_Y);

      ads.push({
        'author': {
          'avatar': 'img/avatars/user0' + i + '.png'
        },
        'offer': {
          'title': 'Предложение ' + i,
          'address': locationX + ', ' + locationY,
          'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
          'type': TYPES[getRandomNumber(0, TYPES.length - 1)],
          'rooms': getRandomNumber(1, ROOMS),
          'guests': getRandomNumber(1, MAX_GUESTS),
          'checkin': TIMES[getRandomNumber(0, TIMES.length - 1)],
          'checkout': TIMES[getRandomNumber(0, TIMES.length - 1)],
          'features': window.util.shuffleArray(SERVICES).slice(0, getRandomNumber(1, SERVICES.length)),
          'description': 'Описание ' + i,
          'photos': window.util.shuffleArray(PHOTOS).slice(0, getRandomNumber(1, PHOTOS.length)),
        },
        'location': {
          'x': locationX,
          'y': locationY
        }
      });
    }
    return ads;
  };

  window.data = {
    generatesAds: generatesAds
  };
})();
