function addEventOnMenuBtn(){
	for(i=0;i<document.getElementById('menubar').children.length;i++){
		document.getElementById('menubar').children[i].onmousedown = function(event, LocalVar = this){
			//console.log(LocalVar.attributes.name.value);
			//입력한 코드 확인 코드
			MenuBtnAction(LocalVar);
		}
	}
}

function MenuBtnAction(LocalVar){
	for(i=0;i<document.getElementById('menubar').children.length;i++){
		document.getElementById('menubar').children[i].classList = "";
	}
	
	if(LocalVar.classList == "checked"){
		LocalVar.classList = "";
	}else{
		LocalVar.classList = "checked";
	}
	
	for(i=0;i<document.getElementById("RContent").children.length;i++){
		document.getElementById("RContent").children[i].style = "display: none;";
	}
	document.querySelector("div#RContent > div[name='" + LocalVar.attributes.name.value + "']").style = "display: block;";
}