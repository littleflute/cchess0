// file: test1.js
// by littleflute
// 2019/9/12 2:07am  org,usa

"use strict";
var _my_ver = "v0.0.22";

var BOARD_WIDTH = 521;
var BOARD_HEIGHT = 577;
var SQUARE_SIZE = 57;
var SQUARE_LEFT = (BOARD_WIDTH - SQUARE_SIZE * 9) >> 1;
var SQUARE_TOP = (BOARD_HEIGHT - SQUARE_SIZE * 10) >> 1;

function FILE_X(sq) {  return sq & 15;  }
function RANK_Y(sq) {  return sq >> 4;  }
function SQ_X(sq)   {  return SQUARE_LEFT + (FILE_X(sq) - 3) * SQUARE_SIZE;  }
function SQ_Y(sq)   {  return SQUARE_TOP + (RANK_Y(sq) - 3) * SQUARE_SIZE;    }

var IN_BOARD_ = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
var xdPIECE_NAME = [
  "oo", null, null, null, null, null, null, null,
  "rk", "ra", "rb", "rn", "rr", "rc", "rp", null,
  "bk", "ba", "bb", "bn", "br", "bc", "bp", null,
];

function IN_BOARD(sq) {  return IN_BOARD_[sq] != 0;  }


function xdBoardClass(oContainer, images, sounds) {   
  this.drawSquare = function(sq, selected) {
      var img = this.imgSquares[sq];
      img.src = this.images + xdPIECE_NAME[8] + ".gif";
      img.style.backgroundImage = selected ? "url(" + this.images + "oos.gif)" : "";
  }
  this.images = images;
  this.sounds = sounds; 

  this.imgSquares = [];
 
  var style = oContainer.style;
  style.position = "relative";
  style.width = BOARD_WIDTH + "px";
  style.height = BOARD_HEIGHT + "px";
  style.background = "url(" + images + "board.jpg)";


  for (var sq = 0; sq < 256; sq ++) {

      if (!IN_BOARD(sq)) {
        this.imgSquares.push(null);
        continue;
      }
      var img = document.createElement("img");
      var style = img.style;
      style.position = "absolute"; 
      style.left = SQ_X(sq);
      style.top = SQ_Y(sq); 
      style.width = SQUARE_SIZE;
      style.height = SQUARE_SIZE;
      style.zIndex = 0; 

      oContainer.appendChild(img);
      this.imgSquares.push(img);
  }

   
  this.flushBoard();
}
xdBoardClass.prototype.flushBoard = function() { 
  for (var sq = 0; sq < 256; sq ++) {
    if (IN_BOARD(sq)) {
      this.drawSquare(sq, false);
    }
  }
}


// Test       
  
var _run  = function(){    
  var main = blo0.blDiv(document.body, "id_4_main", "main v0.2");
  var style ="position: absolute;";
  style += "z-index: 9;";
  style += "background-color: #f1f1f1;";
  style += "text-align: center;";
  style += "border: 1px solid #d3d3d3;";
  style += "left: 400px";
  style += "top: 140px";
  main.style =style;
  var title = blo0.blDiv(main, main.id+"Header", "Header",blGrey[1]);
  style ="padding: 10px;";
  style += "z-index: 10;";
  style += "cursor: move;";
  style += "text-align: center;";
  style += "border: 1px solid #fff;";
  style += "background-color: #2196F3;";
  title.style =style;

  blo0.blMakeDivMovable(main);
  
  main.v = blo0.blDiv(main, main.id + "v","v",blGrey[5]); 

  var board1 = new xdBoardClass(main.v, "https://littleflute.github.io/cchess0/cchess/images/", "https://littleflute.github.io/cchess0/cchess/sounds/");
}

_run();  