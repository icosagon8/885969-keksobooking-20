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
        'features': shuffleArray(SERVICES).slice(0, getRandomNumber(1, SERVICES.length)),
        'description': 'Описание ' + i,
        'photos': shuffleArray(PHOTOS).slice(0, getRandomNumber(1, PHOTOS.length)),
      },
      'location': {
        'x': locationX,
        'y': locationY
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

var ads = generatesAds(NUMBER_OF_ADS);

var drawAd = function () {
  var fragment = document.createDocumentFragment();
  var mapPinsElement = document.querySelector('.map__pins');
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderMapPin(ads[i]));
  }
  mapPinsElement.appendChild(fragment);
};

drawAd();

var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

var MAP_TYPES = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var removeElementMod = function (features, classCore, element) {
  var modifier = element.querySelectorAll('.' + classCore);
  for (var j = 0; j < modifier.length; j++) {
    for (var i = 0; i < features.length; i++) {
      if (modifier[j].classList.contains(classCore + '--' + features[i])) {
        break;
      } else if (!(modifier[j].classList.contains(classCore + '--' + features[i])) && !(features[i] === features[features.length - 1])) {
        continue;
      } else {
        modifier[j].parentNode.removeChild(modifier[j]);
      }
    }
  }
};

var renderMapCard = function (ad) {
  var cardElement = cardTemplate.cloneNode(true);
  var fragment = document.createDocumentFragment();
  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = MAP_TYPES[ad.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  removeElementMod(ad.offer.features, 'popup__feature', cardElement);
  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  cardElement.querySelector('.popup__photo').src = ad.offer.photos[0];
  if (ad.offer.photos.length > 1) {
    for (var i = 1; i < ad.offer.photos.length; i++) {
      var cardImgElement = cardTemplate.querySelector('.popup__photo').cloneNode();
      cardImgElement.src = ad.offer.photos[i];
      cardElement.querySelector('.popup__photos').appendChild(cardImgElement);
    }
  }
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
  fragment.append(cardElement);
  return fragment;
};

document.querySelector('.map').insertBefore(renderMapCard(ads[0]), document.querySelector('.map__filters-container'));
