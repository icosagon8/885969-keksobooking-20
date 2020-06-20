'use strict';
(function () {
  var NUMBER_OF_ADS = 8;
  var ads = window.data.generatesAds(NUMBER_OF_ADS);
  var mapPinsElement = document.querySelector('.map__pins');

  var drawAd = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(window.pin.renderMapPin(ads[i]));
    }
    mapPinsElement.appendChild(fragment);
  };

  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var openPopup = function (ad) {
    var popup = window.form.map.querySelector('.popup');
    if (popup !== null) {
      popup.remove();
    }
    window.form.map.insertBefore(window.card.renderMapCard(ad), mapFiltersContainer);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };

  var closePopup = function () {
    var popup = window.form.map.querySelector('.popup');
    popup.remove();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  window.map = {
    drawAd: drawAd,
    mapPinsElement: mapPinsElement,
    ads: ads,
    openPopup: openPopup,
    onPopupEscPress: onPopupEscPress,
    closePopup: closePopup
  };
})();
