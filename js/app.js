(function(){

  var app = angular.module('songPlayer', [] );

  var songs = [
    {
      id: 0,
      title: 'To The Moon',
      artist: 'Bensley', 
      src: 'data/Bensley - To The Moon.mp3',
      cover: 'images/Bensley - To The Moon.png',
      imgStatus: 'play'
    }, { 
      id: 1,
      title: 'Backpack Rehab (Feat. Cates&dpL)', 
      artist: 'Bassnectar', 
      src: 'data/Bassnectar - Backpack Rehab (Feat. Cates&dpL).mp3',
      cover: 'images/Bassnectar - Backpack Rehab (Feat. Cates&dpL).png',
      imgStatus: 'play',
    }, {
      id: 2,
      title: 'Fingerbib',
      artist: 'Aphex Twin', 
      src: 'data/Aphex Twin - Fingerbib.mp3', 
      cover: 'images/Aphex Twin - Fingerbib.png',
      imgStatus: 'play'
    }
  ];

  app.controller('playerController', function($scope) {
    $scope.playlist = songs;
    $scope.audio = document.getElementById('player__audio');
    $scope.JQaudio = $('.player__audio');
    $scope.currentPlayingId = 0;
    $scope.isSongLocked = false;

    $scope.isPlaying = function () {
      return !$scope.audio.paused;
    }

    $scope.playpause = function(songId) {
      if ($scope.isSongLocked === true) return;

      if (songId === $scope.currentPlayingId) {
        $scope.playpauseOnly();

      } else { //switch song, load it
        $scope.JQaudio.attr('autoplay', 'autoplay'); // add autoplay here to not auto play on page load but only on song switch

        $scope.stopAnimate(); // stop the animation of the previous song

        $scope.currentPlayingId = songId;

        $scope.playAnimate(); // play animation of the current song

        $scope.updatePlaylistImgStatus(songId, 'pause');
      }
    }

    $scope.playpauseOnly = function() {
      if ($scope.isSongLocked === true) return;

      if ($scope.isPlaying()) {
        $scope.stopAnimate();
        $scope.audio.pause();
        $scope.updatePlaylistImgStatus($scope.currentPlayingId, 'play');
      } else {
        $scope.audio.play();

        $scope.playAnimate();

        $scope.updatePlaylistImgStatus($scope.currentPlayingId, 'pause');
      }
    }

    $scope.stop = function () {
      if ($scope.isPlaying()) $scope.audio.pause();
      $scope.stopAnimate();
      $scope.audio.currentTime = 0;
      $('#player__list__item__'+$scope.currentPlayingId).css('width','0%');
      $scope.updatePlaylistImgStatus($scope.currentPlayingId, 'play');
    }

    $scope.back = function() {
      $scope.stopAnimate();
      $scope.audio.currentTime = 0;
      $('#player__list__item__'+$scope.currentPlayingId).css('width','0%');
      if ($scope.isPlaying()) $scope.playAnimate();
    }

    $scope.updatePlaylistImgStatus = function(songId, status) {
      $.each($scope.playlist, function () {
        this.imgStatus = 'play';
        if (this.id === songId) this.imgStatus = status;
      });
    }

    $scope.playAnimate = function() {

      $('#player__list__item__'+$scope.currentPlayingId).css('background-color','red').animate({
        width: "100%"
      }, 60000, 'linear', function() {
        $scope.isSongLocked = true;
        $scope.audio.pause();
        $scope.$apply(function () {
          $scope.updatePlaylistImgStatus($scope.currentPlayingId, 'play');
        });

        $('#player__list__item__'+$scope.currentPlayingId).css('background-color','#0A51C3').animate({
          width: "0%"
        }, 30000, 'linear', function() {
          $scope.isSongLocked = false;
          $scope.$apply(function () {
            $scope.updatePlaylistImgStatus($scope.currentPlayingId, 'play');
          });
        });

      });
    }

    $scope.stopAnimate = function() {
      $('#player__list__item__'+$scope.currentPlayingId).stop();
    }

  });

  app.filter('trustedAudioUrl', function($sce) {
    return function(audioFile) {
      return $sce.trustAsResourceUrl(audioFile);
    };
  });

})();
