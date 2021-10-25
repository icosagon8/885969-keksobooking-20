'use strict';
(function () {
  var TIMEOUT_IN_MS = 10000;
  var URL_LOAD = 'https://21.javascript.pages.academy/keksobooking/data';
  var URL_SAVE = 'https://21.javascript.pages.academy/keksobooking';
  var METHOD_LOAD = 'GET';
  var METHOD_SAVE = 'POST';
  var StatusCode = {
    OK: 200
  };

  var connectsToServer = function (load, error, method, url, data) {
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
    xhr.open(method, url);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    connectsToServer(onLoad, onError, METHOD_LOAD, URL_LOAD);
  };

  var save = function (data, onLoad, onError) {
    connectsToServer(onLoad, onError, METHOD_SAVE, URL_SAVE, data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
