// file: test1.js
// by littleflute
// 2019/9/12 2:07am  org,usa

"use strict";
var _my_ver = "v0.0.13";

var BOARD_WIDTH = 521;
var BOARD_HEIGHT = 577;
var SQUARE_SIZE = 57;

function xdBoardClass(oContainer, images, sounds) {   
  this.images = images;
  this.sounds = sounds; 

  var style = oContainer.style;
  style.position = "relative";
  style.width = BOARD_WIDTH + "px";
  style.height = BOARD_HEIGHT + "px";
  style.background = "url(" + images + "board.jpg)";

  var img = document.createElement("img");
    var style = img.style;
    style.position = "absolute"; 
    style.width = SQUARE_SIZE;
    style.height = SQUARE_SIZE;
    style.zIndex = 0; 
    img.src = this.images + "rk.gif"; 
    img.style.backgroundImage = true ? "url(" + this.images + "oos.gif)" : "";
    oContainer.appendChild(img); 
}
 

// Test       
  
var _run  = function(id,x,y){  
 // alert(blo0);
  var d1 = document.createElement("div");
  d1.innerHTML  = "d1" + _my_ver;
  document.body.appendChild(d1);
  var blTest = blo0.blDiv(document.body,"id_4_div_blTest","blTest");
 var board1 = new xdBoardClass(d1, "https://littleflute.github.io/cchess0/cchess/images/", "https://littleflute.github.io/cchess0/cchess/sounds/");
}

_run("id_4_run ",100,100);  