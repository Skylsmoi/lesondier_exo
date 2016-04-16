(function(){

    var app = angular.module('songPlayer', [] );

    var songs = [
        { 
          title: 'Fingerbib',
          artist: 'Aphex Twin', 
          url: 'data/Aphex Twin - Fingerbib.mp3', 
          cover: 'images/Aphex Twin - Fingerbib.png' 
        }, { 
          title: 'Backpack Rehab (Feat. Cates&dpL)', 
          artist: 'Bassnectar', 
          url: 'data/Bassnectar - Backpack Rehab (Feat. Cates&dpL).mp3',
          cover: 'images/Bassnectar - Backpack Rehab (Feat. Cates&dpL).png'
        }, {
          title: 'To The Moon',
          artist: 'Bensley', 
          url: 'data/Bensley - To The Moon',
          cover: 'images/Bensley - To The Moon.png'
        }
    ];

    app.controller('playerController', function() {
        this.playlist = songs;
    });

})();
