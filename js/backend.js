'use strict';
(function () {
  var TIMEOUT_IN_MS = 10000;
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var StatusCode = {
    OK: 200
  };

  var connectsToServer = function (load, error, method, URL, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        load(xhr.response);
      } else {
        error('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      error('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      error('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(method, URL);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    connectsToServer(onLoad, onError, 'GET', URL_LOAD);
  };

  window.backend = {
    load: load
  };
})();
