var fm = {
	scrollContext : function(){
		document.querySelector("div#RContent").scrollTo(0, 999999);
	},
	scrollLog : function(){
		document.querySelector("div#RLog").scrollTo(0, 999999);
	},
	onRightClickRed : function(event){
		event.preventDefault();
	},
	redactLog : function(event, thisElement){
		//console.log(event);
		//console.log(thisElement);
		//confirm('당신은 삭제 "'+thisElement.children[0].innerHTML+'" 정말로 삭제?');
		//console.log(dm.getCurrentRow(event, thisElement, thisElement));
		/*
		for(i=0;i<thisElement.parentElement.children.length;i++){
			if(thisElement.parentElement.children[i] === thisElement){
				console.log(i);
			}
		}
		*/
		
		if(confirm('당신은 삭제 "'+thisElement.children[0].innerHTML+'" 정말로 선택 삭제?')){
			for(i=0;i<thisElement.parentElement.children.length;i++){
				if(thisElement.parentElement.children[i] === thisElement){
					localStorage.setItem("tdListDataset", dm.manageDataline(localStorage.getItem("tdListDataset"), "<log>", i));
					thisElement.parentElement.removeChild(thisElement);
					
					break;
					//console.log(dm.manageDataline(localStorage.getItem("tdListDataset"), "<log>", i));
				}
			}
		}
		
	}
}