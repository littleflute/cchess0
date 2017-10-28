function blClass()
{
  this.blBtn = function(oBoss,id,html,clr){
    var r = document.getElementById(id);
    if(!r){
        r = document.createElement("button");
        r.id = id;
    	r.innerHTML = html; 
        r.style.backgroundColor=clr?clr:"green";
    	if(oBoss!=null)oBoss.appendChild(r);
    }
    return r;
  }
  this.blDiv = function (oBoss,id,html){
    var r = document.getElementById(id);
    if(!r){
        r = document.createElement("div");
        r.id = id;
        r.style.border = "1px solid #3d3d3d";
      //  r.style.position = "fixed";
        r.style.top	=0; 
        r.style.backgroundColor="rgb(0,100,120)"; 

    	r.innerHTML = html; 
    	if(oBoss!=null) oBoss.appendChild(r);
    }
    return r;
  }
  this.blSelect = function (oBoss,id,size) {
    var r = document.getElementById(id);
    if(!r){
      r = document.createElement("SELECT");
      r.setAttribute("id", id);
      r.setAttribute("size",size);
      if(oBoss!=null) oBoss.appendChild(r);
    }
    var z = document.createElement("option");
    z.setAttribute("value", 0);
    var t = document.createTextNode("=== start ===");
    z.appendChild(t);
    r.appendChild(z);
    r.selectedIndex = 0;
    return r;
  }
  
  this.blTextField = function (oBoss,id,value){
    var r = document.getElementById(id);
    if(!r){
        r = document.createElement("INPUT");
        r.id = id;
        r.setAttribute("type", "text");
    	r.setAttribute("value", value); 
 
    	if(oBoss!=null) oBoss.appendChild(r);
    }
    return r;
  }
  this.blImg = function (oBoss,id,src){
    var r = document.getElementById(id);
    if(!r){
        r = document.createElement("img");
        r.id = id;
        r.src = src;
        r.style.border = "1px solid #3d3d3d";
      //  r.style.position = "fixed";
        r.style.top	=0; 
     //   r.style.backgroundColor="rgb(0,100,120)"; 
 
    	if(oBoss!=null) oBoss.appendChild(r);
    }
    return r;
  }
  this.blShowObj2Div = function(oBoss,obj){ 
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
      d.innerHTML = "";
      d.style.border = "blue 1px solid";
      d.style.backgroundColor = "green";
      d.style.color = "yellow";
      oBoss.appendChild(d);
      var t = document.createElement("textarea");
      t.innerHTML = obj[i];
      t.style.border = "blue 1px solid";
      t.style.backgroundColor = "green";
      t.style.color = "yellow";
      d.appendChild(t);
    }
  }  //END this.blShowObj2Div
  
  this.blMakeDivMovable = function (elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (document.getElementById(elmnt.id + "Header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
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
    }//END this.blMakeDivMovable
}//END blClass
