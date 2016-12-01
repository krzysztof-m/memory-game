
$(document).ready(function() {
  var tilesNumber = 16,
      counterToEnd,
      counter,
      previousTile = null,
      tiles = [],
      selectedTiles = [],
      selectedTilesShow = false,
      tilesIcons = [
        'map',
        'pencil',
        'print',
        'magic',
        'book',
        'envelope',
        'coffee',
        'bug'
      ],
      colors = [
        '#ff0',
        '#000',
        '#333',
        '#999',
        '#0f0',
        '#f00',
        '#00f',
        '#09f',
      ],
      $board = $('.board');
  
  function makeTilesArray(array, number) {
    for (var i = 0; i < tilesNumber; i++) {
      array.push(Math.floor(i / 2));
    }
  }
  function swap(array,firstIndex,secondIndex) {
    var tmp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = tmp;
  }
  function shuffleArray(array) {
    for (var i = 0; i < array.length; i++) {
      var randomIndex = Math.floor(Math.random() * array.length);
      swap(array,i,randomIndex);
    }
  }
  function toggleTile($tile,option) {
    var $icon = $tile.find('.fa');
    if (option === 'show')
      $icon.removeClass('fa-question').addClass('fa-' + $tile.data('icon'));
    else if (option === 'hide')
      setTimeout(function() {
        $icon.removeClass('fa-' + $tile.data('icon')).addClass('fa-question');
        selectedTilesShow = false;
      },1000);
  }
  function drawTiles(array) {
    for (var i = 0; i < array.length; i++) {
      //var tile = $('<div class="tile"><i class="fa fa-' + tilesIcons[array[i]] + '"></i></div>');
      var tile = $('<div class="tile"><i class="fa fa-question"></i></div>');
      tile.data('icon',tilesIcons[array[i]]);
      tile.data('number',array[i]);
      tile.on('click', function() {
        if (selectedTilesShow)
          return false;
        if (previousTile === this) {
          return false;
        }
        
        toggleTile($(this),'show');
        
        selectedTiles.push($(this));
        
        if (selectedTiles.length === 2) {
          selectedTilesShow = true;
          if (selectedTiles[0].data('number') === selectedTiles[1].data('number')) {
            selectedTilesShow = false;
            selectedTiles.forEach(function($tile) {
              $tile.css({
                'opacity': '.5',
                'cursor': 'initial'
              });
              $tile.off('click');
            });
            if (!(--counterToEnd)) {
              alert("Won");
              startGame();
            }
          } else {
            selectedTiles.forEach(function($tile) {
              toggleTile($tile,'hide');
            });
          }
          counter++;
          previousTile = null;
          selectedTiles = [];
        } else {
          previousTile = this;
        }
        //console.log(selectedTiles);
      });
      tile.appendTo($board);
    }
  }
  function startGame() {
    tiles = [];
    counterToEnd = (tilesNumber / 2);
    $board.empty();
    makeTilesArray(tiles);
    shuffleArray(tiles);
    drawTiles(tiles);
  }
  startGame();
  console.log(tiles);
});