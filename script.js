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
        'rgba(102, 153, 0,.5)',
        'rgba(255, 153, 0,.5)',
        'rgba(204, 0, 0,.5)',
        'rgba(153, 0, 255,.5)',
        'rgba(102, 0, 51,.5)',
        'rgba(102, 51, 0,.5)',
        'rgba(0, 102, 153,.5)',
        'rgba(51, 153, 255,.5)',
      ],
      $board = $('.board'),
      $counter = $('#counter');
  
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
    if (option === 'show') {
      $icon.removeClass('fa-question').addClass('fa-' + $tile.data('icon'));
      $tile.css('background-color',colors[$tile.data('number')]);
    }
    else if (option === 'hide') {
      setTimeout(function() {
        $icon.removeClass('fa-' + $tile.data('icon')).addClass('fa-question');
        $tile.css('background-color','rgba(255, 255, 255, 0.5)');
        selectedTilesShow = false;
      },1000);
    }
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
          counter++;
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
              alert("You win");
              startGame();
            }
          } else {
            selectedTiles.forEach(function($tile) {
              toggleTile($tile,'hide');
            });
          }
          previousTile = null;
          selectedTiles = [];
          updateCounter();
        } else {
          previousTile = this;
        }
        //console.log(selectedTiles);
      });
      tile.appendTo($board);
    }
  }
  function updateCounter() {
    $counter.text(counter);
  }
  function startGame() {
    tiles = [];
    counterToEnd = (tilesNumber / 2);
    counter = 0;
    updateCounter();
    $board.empty();
    makeTilesArray(tiles);
    shuffleArray(tiles);
    drawTiles(tiles);
  }
  startGame();
  console.log(tiles);
});