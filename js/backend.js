'use strict';

(function () {
  var urls = {
    save: 'https://javascript.pages.academy/keksobooking/data',
    post: 'https://javascript.pages.academy/keksobooking'
  };

  var createXMLHttpRequest = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        throw new Error(xhr.status + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения с сервером');
    });

    xhr.addEventListener('timeout', function () {
      onError('Истекло время ожидания ответа от сервера');
    });

    if (!data) {
      xhr.open('GET', urls.save);
      xhr.send();
    } else {
      xhr.open('POST', urls.post);
      xhr.send(data);
    }
  };

  window.backend = {
    load: function (onSuccess, onError) {
      createXMLHttpRequest(null, onSuccess, onError);
    },
    post: function (data, onSuccess, onError) {
      createXMLHttpRequest(data, onSuccess, onError);
    }
  };
})();
