'use strict';

(function () {
  var FILES_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var userAvatarChooser = document.querySelector('#avatar');
  var dropAvatarZone = document.querySelector('.ad-form-header__drop-zone');
  var userImagesChooser = document.querySelector('#images');
  var userImageTemplate = document.querySelector('.ad-form__photo');
  var dropImageZone = document.querySelector('.ad-form__drop-zone');

  var checkFileType = function (file) {
    var fileName = file.name.toLowerCase();

    return FILES_TYPES.some(function (elem) {
      return fileName.endsWith(elem);
    });
  };

  var readFile = function (file, container) {
    if (checkFileType(file)) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        container.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  userAvatarChooser.addEventListener('change', function () {
    readFile(userAvatarChooser.files[0], window.main.userAvatar);
  });

  dropAvatarZone.addEventListener('dragover', window.utils.preventDefault, false);
  dropAvatarZone.addEventListener('dragleave', window.utils.preventDefault, false);
  dropAvatarZone.addEventListener('drop', function (evt) {
    readFile(evt.dataTransfer.files[0], window.main.userAvatar);

    evt.preventDefault();
  }, false);

  var renderImageElement = function (file) {
    var userImageUrl = URL.createObjectURL(file);
    userImageTemplate.classList.remove('visually-hidden');
    var userImageBlock = userImageTemplate.cloneNode(true);
    userImageTemplate.classList.add('visually-hidden');
    var userImage = userImageBlock.querySelector('img');

    userImage.addEventListener('load', function () {
      URL.revokeObjectURL(userImageUrl);
    });
    userImage.src = userImageUrl;

    return userImageBlock;
  };

  userImagesChooser.addEventListener('change', function () {
    var files = userImagesChooser.files;

    for (var i = 0; i < files.length; i++) {
      if (!checkFileType(files[i])) {
        return;
      }
    }

    window.utils.createElements(window.main.userImageContainer, renderImageElement, files);
  });

  dropImageZone.addEventListener('dragover', window.utils.preventDefault, false);
  dropImageZone.addEventListener('dragleave', window.utils.preventDefault, false);
  dropImageZone.addEventListener('drop', function (evt) {
    evt.preventDefault();

    var files = evt.dataTransfer.files;

    for (var i = 0; i < files.length; i++) {
      if (!checkFileType(files[i])) {
        return;
      }
    }

    window.utils.createElements(window.main.userImageContainer, renderImageElement, evt.dataTransfer.files);
  }, false);
})();
