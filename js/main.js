'use strict';

var NUMBER_OF_ADS = 8;
var MIN_COORDINAT_X = 0;
var MAX_COORDINAT_X = 1200;
var MIN_COORDINAT_Y = 130;
var MAX_COORDINAT_Y = 630;
var MIN_PRICE = 1000;
var MAX_PRICE = 5000;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = 4;
var MAX_GUESTS = 8;
var TIMES = ['12:00', '13:00', '14:00'];
var SERVICES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;

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

var generatesAds = function () {
  var ads = [];

  for (var i = 1; i <= NUMBER_OF_ADS; i++) {
    ads.push({
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },
      'offer': {
        'title': 'Предложение ' + i,
        'address': getRandomNumber(MIN_COORDINAT_X, MAX_COORDINAT_X) + ', ' + getRandomNumber(MIN_COORDINAT_Y, MAX_COORDINAT_Y),
        'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
        'type': TYPES[getRandomNumber(0, TYPES.length - 1)],
        'rooms': getRandomNumber(1, ROOMS),
        'guests': getRandomNumber(1, MAX_GUESTS),
        'checkin': TIMES[getRandomNumber(0, TIMES.length - 1)],
        'checkout': TIMES[getRandomNumber(0, TIMES.length - 1)],
        'features': shuffleArray(SERVICES),
        'description': 'Описание' + i,
        'photos': shuffleArray(PHOTOS).slice(0, getRandomNumber(1, PHOTOS.length)),
      },
      'location': {
        'x': getRandomNumber(MIN_COORDINAT_X, MAX_COORDINAT_X),
        'y': getRandomNumber(MIN_COORDINAT_Y, MAX_COORDINAT_Y)
      }
    });
  }
  return ads;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderMapPin = function (ad) {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.style.left = ad.location.x - MAP_PIN_WIDTH / 2 + 'px';
  mapPinElement.style.top = ad.location.y - MAP_PIN_HEIGHT + 'px';
  var mapPinImg = mapPinElement.querySelector('img');
  mapPinImg.src = ad.author.avatar;
  mapPinImg.alt = ad.offer.title;
  return mapPinElement;
};

var drawAd = function () {
  var ads = generatesAds();
  var fragment = document.createDocumentFragment();
  var mapPinsElement = document.querySelector('.map__pins');
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderMapPin(ads[i]));
  }
  mapPinsElement.appendChild(fragment);
};

drawAd();
