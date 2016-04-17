(function(){

    var app = angular.module('songPlayer', [] );

    var songs = [
        {
          id: 0,
          title: 'Fingerbib',
          artist: 'Aphex Twin', 
          src: 'data/Aphex Twin - Fingerbib.mp3', 
          cover: 'images/Aphex Twin - Fingerbib.png' 
        }, { 
          id: 1,
          title: 'Backpack Rehab (Feat. Cates&dpL)', 
          artist: 'Bassnectar', 
          src: 'data/Bassnectar - Backpack Rehab (Feat. Cates&dpL).mp3',
          cover: 'images/Bassnectar - Backpack Rehab (Feat. Cates&dpL).png'
        }, {
          id: 2,
          title: 'To The Moon',
          artist: 'Bensley', 
          src: 'data/Bensley - To The Moon.mp3',
          cover: 'images/Bensley - To The Moon.png'
        }
    ];

    app.controller('playerController', function() {
        this.playlist = songs;
        this.audio = document.getElementById('player__audio');
        this.JQaudio = $('.player__audio');
        this.currentPlayingId = -1; //id of the current song, -1 means no music loaded

        this.isPlaying = function () {
          return !this.audio.paused;
        }

        this.playpause = function(songId) {
          if (songId !== undefined) { //if songId !== undefined, do playpause or switch song
            if (songId === this.currentPlayingId) { // same song, do playpause
              if (this.isPlaying()) {
                this.audio.pause();
                this.updatePlayPauseImages(this.currentPlayingId, false);
              } else {
                this.audio.play();
                this.updatePlayPauseImages(this.currentPlayingId, true);
              }
            } else { //switch song, load it
              this.JQaudio.attr('src', this.playlist[songId].src);
              this.currentPlayingId = songId;
              this.updatePlayPauseImages(this.currentPlayingId, true);
            }
          } else { //if songId === undefined, do playpause to current playing song
            if (this.isPlaying()) {
              this.audio.pause();
              this.updatePlayPauseImages(this.currentPlayingId, false);
            } else if (this.currentPlayingId === -1) {
              this.JQaudio.attr('src', this.playlist[0].src);
              this.currentPlayingId = this.playlist[0].id;
              this.updatePlayPauseImages(this.currentPlayingId, true);
            } else {
              this.audio.play();
              this.updatePlayPauseImages(this.currentPlayingId, true);
            }
          }
        }

        this.stop = function () {
          if (this.isPlaying()) {
            this.audio.pause();
            this.audio.currentTime = 0;
          }
          $('.player__list__item__img__status').children('img').attr('src', 'images/play.png');
          $('.player__current__control__buttons__playpause').children('img').attr('src', 'images/play.png');
        }

        this.back = function() {
          this.audio.currentTime = 0;
        }

        this.updatePlayPauseImages = function(songId, status) {
          $('.player__list__item__img__status').children('img').attr('src', 'images/play.png');
          if (status === true) {
            $('.songId_'+songId).children('img').attr('src', 'images/pause.png');
            $('.player__current__control__buttons__playpause').children('img').attr('src', 'images/pause.png');
          } else {
            $('.songId_'+songId).children('img').attr('src', 'images/play.png');
            $('.player__current__control__buttons__playpause').children('img').attr('src', 'images/play.png');
          }
          $('.player__current__cover__img').children('img').attr('src', this.playlist[songId].cover);
        }
    });

})();
