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
var MIN_GUESTS = 0;
var MAX_GUESTS = 8;
var TIMES = ['12:00', '13:00', '14:00'];
var SERVICES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;
var MAP_PIN_MAIN_ANGLE_HEIGHT = 15;
var MAX_ROOMS_NUMBER = 100;

var MapTypes = {
  PALACE: {
    'type': 'Дворец',
    'price': 10000
  },
  FLAT: {
    'type': 'Квартира',
    'price': 1000
  },
  HOUSE: {
    'type': 'Дом',
    'price': 5000
  },
  BUNGALO: {
    'type': 'Бунгало',
    'price': 0
  }
};

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

var mapPinsElement = document.querySelector('.map__pins');

var drawAd = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderMapPin(ads[i]));
  }
  mapPinsElement.appendChild(fragment);
};

var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

var addFeatures = function (features, element) {
  var featureList = element.querySelector('.popup__features');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var cardFeatureElement = element.querySelector('.popup__feature--' + features[i]).cloneNode();
    fragment.append(cardFeatureElement);
  }
  featureList.innerHTML = '';
  featureList.append(fragment);
};

var renderMapCard = function (ad) {
  var cardElement = cardTemplate.cloneNode(true);
  var fragment = document.createDocumentFragment();
  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = MapTypes[ad.offer.type.toUpperCase()].type;
  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  addFeatures(ad.offer.features, cardElement);
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
  cardElement.addEventListener('keydown', onPopupEscPress);
  var popupClose = cardElement.querySelector('.popup__close');
  popupClose.addEventListener('click', function () {
    closePopup();
  });
  fragment.append(cardElement);
  return fragment;
};

var adForm = document.querySelector('.ad-form');
var adFormFieldset = adForm.querySelectorAll('fieldset');

var switchDisabled = function (elements, bool) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].disabled = bool;
  }
};

switchDisabled(adFormFieldset, true);

var mapFilters = map.querySelector('.map__filters');
var mapFiltersSelect = mapFilters.querySelectorAll('select');

switchDisabled(mapFiltersSelect, true);

var mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');

switchDisabled(mapFiltersFieldset, true);

var mapPinMain = map.querySelector('.map__pin--main');
var addressField = adForm.querySelector('#address');

var coordinateX = mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2;
var coordinateY = mapPinMain.offsetTop + mapPinMain.offsetHeight / 2;

var outputsCoordinate = function () {
  var coordinate = Math.round(coordinateX) + ', ' + Math.round(coordinateY);
  addressField.value = coordinate;
};

outputsCoordinate();

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

var type = adForm.querySelector('#type');
var price = adForm.querySelector('#price');

var mapFiltersContainer = document.querySelector('.map__filters-container');

var openPopup = function (ad) {
  var popup = map.querySelector('.popup');
  if (popup !== null) {
    popup.remove();
  }
  map.insertBefore(renderMapCard(ad), mapFiltersContainer);
  document.addEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

var closePopup = function () {
  var popup = map.querySelector('.popup');
  popup.remove();
  document.removeEventListener('keydown', onPopupEscPress);
};

var activatesPage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  switchDisabled(adFormFieldset, false);
  switchDisabled(mapFiltersSelect, false);
  switchDisabled(mapFiltersFieldset, false);
  coordinateY = mapPinMain.offsetTop + mapPinMain.offsetHeight + MAP_PIN_MAIN_ANGLE_HEIGHT;
  outputsCoordinate();
  drawAd();
  var mapPins = mapPinsElement.querySelectorAll('button:not(.map__pin--main)');

  var onMapPinClick = function (mapPin, ad) {
    mapPin.addEventListener('click', function () {
      openPopup(ad);
    });
  };

  for (var i = 0; i < ads.length; i++) {
    onMapPinClick(mapPins[i], ads[i]);
  }

  validatesForm(roomNumber);
  validatesForm(capacity);

  mapPinMain.removeEventListener('mousedown', onMapPinMainClickOrPress);
  mapPinMain.removeEventListener('keydown', onMapPinMainClickOrPress);

  synchronizesTimes();

  type.addEventListener('change', function () {
    price.setAttribute('min', MapTypes[type.value.toUpperCase()].price);
    price.setAttribute('placeholder', MapTypes[type.value.toUpperCase()].price);
  });
};

var onMapPinMainClickOrPress = function (evt) {
  if (evt.button === 0 || (evt.key === 'Enter')) {
    activatesPage();
  }
};

mapPinMain.addEventListener('mousedown', onMapPinMainClickOrPress);
mapPinMain.addEventListener('keydown', onMapPinMainClickOrPress);
