// file: blclass.js
// by littleflute
// 2017/11/1 11:46am bjt
var _my_ver = "v0.6.21";

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

	var board1 = new Board(mi1, "images/", "sounds/");
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



