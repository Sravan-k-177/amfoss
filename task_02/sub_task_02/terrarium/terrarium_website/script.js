dragElement(document.getElementById('plant1'));
dragElement(document.getElementById('plant2'));
dragElement(document.getElementById('plant3'));
dragElement(document.getElementById('plant4'));
dragElement(document.getElementById('plant5'));
dragElement(document.getElementById('plant6'));
dragElement(document.getElementById('plant7'));
dragElement(document.getElementById('plant8'));
dragElement(document.getElementById('plant9'));
dragElement(document.getElementById('plant10'));
dragElement(document.getElementById('plant11'));
dragElement(document.getElementById('plant12'));
dragElement(document.getElementById('plant13'));
dragElement(document.getElementById('plant14'));
const jarWalls = document.getElementById("jarwalls");

let plant1 = 0, plant2=0, plant3=0,plant4 = 0, plant5=0, plant6=0,plant7 = 0, plant8=0, plant9=0,plant10 = 0, plant11=0, plant12=0,plant13 = 0, plant14=0;


function dragElement(terrariumElement) {
	//set 4 positions for positioning on the screen
	let pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
	terrariumElement.onpointerdown = pointerDrag;
	function pointerDrag(e) {
		e.preventDefault();
		console.log(e);
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onpointermove = elementDrag;
		document.onpointerup = stopElementDrag;
	}

	function elementDrag(e) {
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		console.log(pos1, pos2, pos3, pos4);
		terrariumElement.style.top = terrariumElement.offsetTop - pos2 + 'px';
		terrariumElement.style.left = terrariumElement.offsetLeft - pos1 + 'px';
	}
	
	function stopElementDrag() {
		document.onpointerup = null;
		document.onpointermove = null;
	}
}


//console.log(plant1);


function imgPopUp(x){
	//console.log(x.id);
	//if (x.id+"101" == 0){
	if (eval(x.id) === 0){
	x.style.transform = "scale(3)";
    x.style.transition = "transform 0.25s ease"
	eval(x.id+"= 1");
	}
	else{https://github.com/RahulSahOfficial/start_reactor.git
		x.style.transform = "scale(1)";
		eval(x.id+"= 0");
		x.style.transform = "tranform 0.25s ease"
	}
	// else{
	// 	x.style.transform = "scale(0.25)";
	// 	x.style.transition = "tranform 0.25s ease";
	// 	eval(x.id + "101" +'= ' + 1);
	// }
	//console.log(eval('let '+ x.id + '= ' + 1 + ';'));
}

function removeTop(x){
	x.style.transform = "scale(0)";
	// x.style.cursor = "pointer";
	jarWalls.style.cursor="pointer";
}