function Copy() {
  if(canvas.getActiveObject() === null){
    return;
  }
	canvas.getActiveObject().clone(function(cloned) {
    //push cloned object into clipboard
		_clipboard = cloned;
	});
}

function Cut() {
  if(canvas.getActiveObject() === null){
    return;
  }
  canvas.getActiveObject().clone(function(cloned) {
		_clipboard = cloned;
    //remove after cloned to clipboard
    canvas.remove(canvas.getActiveObject());
	});
	

}

function Paste() {
  
  if(_clipboard === false){
    return;
  }
	// clone again, so you can do multiple copies.
	_clipboard.clone(function(clonedObj) {
		canvas.discardActiveObject();
		clonedObj.set({
			left: clonedObj.left + 10,
			top: clonedObj.top + 10,
			evented: true,
		});
		if (clonedObj.type === 'activeSelection') {
			// active selection needs a reference to the canvas.
			clonedObj.canvas = canvas;
			clonedObj.forEachObject(function(obj) {
				canvas.add(obj);
			});
			// this should solve the unselectability
			clonedObj.setCoords();
		} else {
			canvas.add(clonedObj);
		}
		_clipboard.top += 10;
		_clipboard.left += 10;
		canvas.setActiveObject(clonedObj);
		canvas.requestRenderAll();
	});
}

function Del() {
  if(canvas.getActiveObject() === null){
    return;
  }
  canvas.remove(canvas.getActiveObject());
}

var canvas = this.__canvas = new fabric.Canvas('c');

// create a rectangle object
var rect = new fabric.Rect({
	left: 100,
	top: 50,
	fill: '#D81B60',
	width: 50,
	height: 50,
	strokeWidth: 2,
	stroke: "#880E4F",
	rx: 10,
	ry: 10,
	angle: 45,
	hasControls: true
});

canvas.add(rect);

var rect3 = new fabric.Rect({
	left: 400,
	top: 70,
	fill: '#D81B60',
	width: 100,
	height: 100,
	strokeWidth: 2,
	stroke: "#880E4F",
	rx: 10,
	ry: 10,
	angle: 45,
	hasControls: true
});
canvas.add(rect3);

// create a rectangle object
var rect2 = new fabric.Rect({
	left: 200,
	top: 50,
	fill: '#F06292',
	width: 50,
	height: 50,
	strokeWidth: 2,
	stroke: "#880E4F",
	rx: 10,
	ry: 10,
	angle: 45,
	hasControls: true
});

canvas.add(rect2);

var circle1 = new fabric.Circle({
	radius: 30,
	fill: '#039BE5',
	left: 0
});

var circle2 = new fabric.Circle({
	radius: 30,
	fill: '#4FC3F7',
	left: 50,
	opacity: 0.7
});

var group = new fabric.Group([circle1, circle2, ], {
	left: 40,
	top: 250
});


fabric.Image.fromURL('https://manufacturingtoolbox.typepad.com/.a/6a014e888e2eab970d01bb09311582970d-500wi', function(img) {
  
  img.set({ 
    originX: "center",
    originY: "center",
    left:450,
    top: 350,
    angle: 0,
    scaleX: .55,
    scaleY: .55,
  });
  
  canvas.add(img);

  
    
});
fabric.Image.fromURL('https://images.unsplash.com/photo-1564166174574-a9666f590437?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', function(img) {
  
  img.set({ 
    originX: "center",
    originY: "center",
    left:250,
    top: 350,
    angle: 0,
    scaleX: .10,
    scaleY: .10,
  });
  
  canvas.add(img);

  
    
});
canvas.add(group);

var _clipboard = false;


window.onload = function() {
  
    var ctrlDown = false,
        ctrlKey = 17,
        cmdKey = 91,
        delKey = 8,
        vKey = 86,
        xKey = 88,
        cKey = 67;
  
    document.addEventListener('keydown', function(e) {
      
      console.log(e.keyCode);
      
      if (e.keyCode == ctrlKey || e.keyCode == cmdKey){
        ctrlDown = true;
      } 
       
      if (ctrlDown && (e.keyCode == cKey)){
        Copy();
      } 
      if (ctrlDown && (e.keyCode == xKey)){
        Cut();
      } 
      if (ctrlDown && (e.keyCode == vKey)) {
        Paste();
      }
      if(e.keyCode == delKey){
        Del();
      }
      
    }, false);
  
    document.addEventListener('keyup', function(e) {
       
      if (e.keyCode == ctrlKey || e.keyCode == cmdKey){
          ctrlDown = false;
        
      } 
      
    }, false);
  
}






const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    "If",
    "You",
    "Like",
    "It",
    "Give",
    "a Love",
    ":)",
    "@ Devid"
];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();