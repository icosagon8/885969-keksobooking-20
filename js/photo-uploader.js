'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'webp'];
  var previewChooser = document.querySelector('.ad-form__field input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview img');
  var housingPhotoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var housingPhoto = document.querySelector('.ad-form__photo');

  var removeImage = function () {
    var housingPhotos = document.querySelector('.ad-form__photo').childNodes;
    if (housingPhotos) {
      for (var i = housingPhotos.length - 1; i >= 0; i--) {
        housingPhotos[i].remove();
      }
    }
  };

  var onImageLoaderChange = function (imgDownloadPlace, avatarPlace) {
    var files = imgDownloadPlace.files;
    var fileNames = [];

    for (var i = 0; i < files.length; i++) {
      fileNames[i] = files[i].name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileNames[i].endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function (evt) {
          if (avatarPlace.tagName === 'IMG') {
            avatarPlace.src = reader.result;
          } else {
            var img = document.createElement('img');
            img.src = evt.target.result;
            img.style.width = '100%';
            img.style.height = '100%';
            avatarPlace.append(img);
          }
        });
      }
      reader.readAsDataURL(files[i]);
    }
  };

  var onPreviewChooserChange = function () {
    window.photoUploader.onImageLoaderChange(previewChooser, preview);
  };

  var onHousingPhotoChooserChange = function () {
    window.photoUploader.onImageLoaderChange(housingPhotoChooser, housingPhoto);
  };

  window.photoUploader = {
    onImageLoaderChange: onImageLoaderChange,
    removeImage: removeImage,
    preview: preview,
    housingPhotoChooser: housingPhotoChooser,
    previewChooser: previewChooser,
    onPreviewChooserChange: onPreviewChooserChange,
    onHousingPhotoChooserChange: onHousingPhotoChooserChange
  };
})();
