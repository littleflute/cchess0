// file: blclass.js
// by littleflute
// 2017/11/1 11:46am bjt
var _my_ver = "v0.6.35";

function blClass ()
{  
    this.blScript = function (id,src){
            var r = document.getElementById(id);
            if(!r){
                r = document.createElement("script");
                r.id = id;
            }
            r.src = src; 
            document.body.appendChild(r);
            return r;
    }
    this.blDiv = function (oBoss,id,html,bkClr){
        var r = document.getElementById(id);
        if(!r){
            r = document.createElement("div");
            r.id = id;
    	    r.innerHTML = html; 
            r.style.backgroundColor=bkClr?bkClr:"gray";
    	    if(oBoss!=null)oBoss.appendChild(r);
        }
        return r;
    }
    this.blTextarea = function (oBoss,id,html,bkClr){
        var r = document.getElementById(id);
        if(!r){
            r = document.createElement("Textarea");
            r.id = id;
    	    r.innerHTML = html; 
            r.style.backgroundColor=bkClr?bkClr:"gray";
    	    if(oBoss!=null)oBoss.appendChild(r);
        }
        return r;
    }

    this.blBtn = function (oBoss,id,html,bkClr){
        var r = document.getElementById(id);
        if(!r){
            r = document.createElement("button");
            r.id = id;
    	    r.innerHTML = html; 
            r.style.backgroundColor=bkClr?bkClr:"green";
    	    if(oBoss!=null)oBoss.appendChild(r);
        }
        return r;
    }
    this.blLink = function (oBoss,id,html,href,bkClr){
        var r = document.getElementById(id);
        if(!r){
            r = document.createElement("a");
    	    var t = document.createTextNode(html);
    	    r.setAttribute("href", href);
    	    r.setAttribute("target", "_blank");
            r.id = id; 
    	    r.style.backgroundColor = bkClr?bkClr:"blue";
        }
        r.innerHTML = html; 
        oBoss.appendChild(r);
        return r;
    }

    this.blShowObj2Div = function (oDivBoss,obj)
    {
        
        var oBoss = oDivBoss;
        if(!oBoss) {
           oBoss = document.createElement("div");
           oBoss.id = "divBlShowObj";
           oBoss.style.border = "green 1px solid";
           document.body.appendChild(oBoss);
        } 
        if(!oBoss){
            alert("boss error!");return;
        }
        oBoss.innerHTML = "";
        for(i in obj)
        {
          var b = document.createElement("button");
          b.id = b.innerHTML = i;
          if(i[0]=="b"&&i[1]=="l") b.style.backgroundColor = "yellow";
          oBoss.appendChild(b);
          var d = document.createElement("div");
          d.innerHTML = obj[i];
          d.style.border = "blue 1px solid";
          d.style.backgroundColor = "green";
          d.style.color = "yellow";
          oBoss.appendChild(d);
        }
    }    
    this.blMakeDivMovable = function (elmnt) {
      	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	var idHeader = document.getElementById(elmnt.id + "Header");
      	if (idHeader) {
        	/* if present, the header is where you move the DIV from:*/
        	idHeader.onmousedown = dragMouseDown;
      	} else {
        	/* otherwise, move the DIV from anywhere inside the DIV:*/
        	elmnt.onmousedown = dragMouseDown;
      	}

      	function dragMouseDown(e) {
        	e = e || window.event;
        	// get the mouse cursor position at startup:
        	pos3 = e.clientX;
        	pos4 = e.clientY;
        	document.onmouseup = closeDragElement;
        	// call a function whenever the cursor moves:
        	document.onmousemove = elementDrag;
		if (idHeader) {
        		idHeader.innerHTML = pos3 + "," + pos4;
      		}	
      	}

      function elementDrag(e) {
        e = e || window.event;
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
	
    this.v = _my_ver;
}
//END: function blClass ()

var RESULT_UNKNOWN = 0;
var RESULT_WIN = 1;
var RESULT_DRAW = 2;
var RESULT_LOSS = 3;

var BOARD_WIDTH = 521;
var BOARD_HEIGHT = 577;
var SQUARE_SIZE = 57;
var SQUARE_LEFT = (BOARD_WIDTH - SQUARE_SIZE * 9) >> 1;
var SQUARE_TOP = (BOARD_HEIGHT - SQUARE_SIZE * 10) >> 1;
var THINKING_SIZE = 32;
var THINKING_LEFT = (BOARD_WIDTH - THINKING_SIZE) >> 1;
var THINKING_TOP = (BOARD_HEIGHT - THINKING_SIZE) >> 1;
var MAX_STEP = 8;
var xdPIECE_NAME = [
  "oo", null, null, null, null, null, null, null,
  "rk", "ra", "rb", "rn", "rr", "rc", "rp", null,
  "bk", "ba", "bb", "bn", "br", "bc", "bp", null,
];

function SQ_X(sq) {
  return SQUARE_LEFT + (FILE_X(sq) - 3) * SQUARE_SIZE;
}

function SQ_Y(sq) {
  return SQUARE_TOP + (RANK_Y(sq) - 3) * SQUARE_SIZE;
}

function xdBoardClass(container, images, sounds) {
  this.images = images;
  this.sounds = sounds;
  this.pos = new Position();
  this.pos.fromFen("rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1");
  this.animated = true;
  this.sound = true;
  this.search = null;
  this.imgSquares = [];
  this.sqSelected = 0;
  this.mvLast = 0;
  this.millis = 0;
  this.computer = -1;
  this.result = RESULT_UNKNOWN;
  this.busy = false;

  var style = container.style;
  style.position = "relative";
  style.width = BOARD_WIDTH + "px";
  style.height = BOARD_HEIGHT + "px";
  style.background = "url(" + images + "board.jpg)";
  var this_ = this;
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
    img.onmousedown = function(sq_) {
      return function() {
        this_.clickSquare(sq_); 
      }
    } (sq);

    container.appendChild(img);
    this.imgSquares.push(img);
  }


  this.flushBoard();

}


xdBoardClass.prototype.drawSquare = function(sq, selected) {
  var img = this.imgSquares[sq];
  img.src = this.images + xdPIECE_NAME[this.pos.squares[sq]] + ".gif";
  img.style.backgroundImage = selected ? "url(" + this.images + "oos.gif)" : "";
}
xdBoardClass.prototype.flushBoard = function() {
  this.mvLast = this.pos.mvList[this.pos.mvList.length - 1];
  for (var sq = 0; sq < 256; sq ++) {
    if (IN_BOARD(sq)) {
      this.drawSquare(sq, sq == SRC(this.mvLast) || sq == DST(this.mvLast));
    }
  }
}

xdBoardClass.prototype.clickSquare = function(sq_) {

  if (this.busy || this.result != RESULT_UNKNOWN) {

    return;
  } 
  var sq = sq_;//this.flipped(sq_);
  var pc = this.pos.squares[sq];
  if ((pc & SIDE_TAG(this.pos.sdPlayer)) != 0) {
    this.playSound("click");
    if (this.mvLast != 0) {
      this.drawSquare(SRC(this.mvLast), false);
      this.drawSquare(DST(this.mvLast), false);
    }
    if (this.sqSelected) {
      this.drawSquare(this.sqSelected, false);
    }
    this.drawSquare(sq, true);
    this.sqSelected = sq;
  } else if (this.sqSelected > 0) {
    this.addMove(MOVE(this.sqSelected, sq), false);
  }
}
xdBoardClass.prototype.playSound = function(soundFile) {
  if (!this.sound) {
    return;
  }
  try {
    new Audio(this.sounds + soundFile + ".wav").play();
  } catch (e) {
    this.dummy.innerHTML= "<embed src=\"" + this.sounds + soundFile +
        ".wav\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
  }
}


// Test 
var xm		= document.getElementById("xdMainDiv"); 
 
xm.blObj	= new blClass; 
xm._test1	= function(id,x,y){
	var o = this.blObj;
	var idBody = id;
	var idHead = id + "Header";
	var main = o.blDiv(document.body,idBody,id + _my_ver);
	var style ="position: absolute;";
	style += "z-index: 9;";
	style += "background-color: #f1f1f1;";
	style += "text-align: center;";
	style += "border: 1px solid #d3d3d3;";
	style += "left: 400px";
	style += "top: 140px";
	main.style =style;
	var title = o.blDiv(main,idHead,"========");
	style ="padding: 10px;";
	style += "z-index: 10;";
	style += "cursor: move;";
	style += "text-align: center;";
	style += "border: 1px solid #fff;";
	style += "background-color: #2196F3;";
	title.style =style;


	o.blMakeDivMovable(main);


	main.style.left 	= x +"px";
	main.style.top		= y +"px";
	var mi1 = o.blDiv(main,id+"mi1","mi1"); 
   // alert("333");
    o.blScript("id_js-Position","position.js");
    var board1 = new xdBoardClass(mi1, "images/", "sounds/");
}
 
xm.run		= function(){
	var bOnOff = this.blObj.blBtn ( this,"bOnOff","On/Off"); 
	var htmlTitle = '<a target = "_blank" href="blclass.js">blclass.js_';
	htmlTitle += xm.blObj.v;
	htmlTitle += '</a>';
	var dTitle = this.blObj.blDiv ( this,"dTitle",htmlTitle);
	dTitle.style="text-align:center;font-size:28px;font-family:ºÚÌå";
	var d = this.blObj.blDiv ( this,"xddbgDiv","xddbgDiv");
	d.v	= "xd1_v0.3.0"; 
	bOnOff.onclick = function ()
	{ 
		new Audio("sounds/click.wav").play();
		this.style.backgroundColor = this.style.backgroundColor=="red"?"green":"red";		
		if(this.style.backgroundColor=="red"){ d.style.display = "none";dTitle.style.display = "none";}
		else {d.style.display = "block";dTitle.style.display = "block";}
	}
 
	xm._test1("test1",100,100); 
}
xm.run(); 



