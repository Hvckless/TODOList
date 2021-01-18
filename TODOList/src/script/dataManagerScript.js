var dm = {
	//싱글 큐 업대이트는 단일 기록을 업대이트 하는데 최적화된 함수
	singleQueUpdate : function(targetString, thisData){
		console.log(targetString + " " + thisData);
		switch(targetString){
			case 'div#todayTODO': localStorage.setItem("tdListDataset", localStorage.getItem("tdListDataset").split('<day>')[0] + "<day>" + localStorage.getItem("tdListDataset").split('<day>')[1]+ (localStorage.getItem("tdListDataset").split("<day>")[1] == "" ? "" : "|") +thisData + "<day>" + localStorage.getItem("tdListDataset").split('<day>')[2]); break;
			case 'div#monthlyTODO': console.log("NEW"); break;
			default: alert("존재하지 않는 구역"); break;
		}
		doThis();
		
		function doThis(){
			let dayDiv = document.createElement('div');
			let dayChecker = document.createElement('div');
			let daySpan = document.createElement('span');
			let dayDel = document.createElement('div');
			
			daySpan.innerHTML = thisData;
			dayChecker.setAttribute("checked", "false");
			dayChecker.onclick = function(event, thisVar = dayDiv){
				/*📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜데이터를 로그로 넘기는 버튼이 있는 구역!!!!*/
				if(dayChecker.attributes.checked.value=="false"){
					dayChecker.setAttribute("checked", "true");
				}
				//기록으로 데이터를 넘겨주세요
				localStorage.setItem("tdListDataset", dm.manageDataline(localStorage.getItem("tdListDataset"), daySpan.innerHTML));
				dm.insertLog(daySpan.innerHTML);
				thisVar.style = "opacity: 0";
				setTimeout(function(){
					document.querySelector('div#todayTODO').removeChild(thisVar);
				}, 300);
			}
			dayDel.onclick = function(event, thisVar = dayDiv){
				/*📜📜📜데이터 삭제 버튼이 있는 구역!!!*/
				thisVar.style = "opacity: 0";
				//localStorage.setItem("tdListDataset", localStorage.getItem("tdListDataset").split(daySpan.innerHTML)[0]+localStorage.getItem("tdListDataset").split(daySpan.innerHTML)[2]);
				localStorage.setItem("tdListDataset", dm.manageDataline(localStorage.getItem("tdListDataset"), daySpan.innerHTML));
				setTimeout(function(){
					document.querySelector('div#todayTODO').removeChild(thisVar);
				}, 300);
			}
			
			dayDiv.appendChild(dayChecker);
			dayDiv.appendChild(daySpan);
			dayDiv.appendChild(dayDel);
			
			document.querySelector(targetString).appendChild(dayDiv);
			
			dm.insertInputArea(targetString);
		}
	},
	initBuildStruct : function(){
		//데이터 쌓는 함수
		
		//localStorage.getItem("tdListDataset").split('<log>')[1].split('|').length
		
		//기록 불러오기
		if((localStorage.getItem("tdListDataset").split('<log>')[1].split('|').length) == 1 && (localStorage.getItem("tdListDataset").split('<log>')[1].split('|')[0] == "")){
		}else{
			for(i=0;i<localStorage.getItem("tdListDataset").split('<log>')[1].split('|').length;i++){
				let logDiv = document.createElement('div');
				let logSpan = document.createElement('span');

				logSpan.innerHTML = localStorage.getItem("tdListDataset").split('<log>')[1].split('|')[i];
				logDiv.appendChild(logSpan);
				document.querySelector("div#RLog").appendChild(logDiv);
			}
		}

		//오늘 할 일 불러오기
		if((localStorage.getItem("tdListDataset").split('<day>')[1].split('|').length == 1) && (localStorage.getItem("tdListDataset").split('<day>')[1].split('|')[0] == "")){
		}else{
			for(i=0;i<localStorage.getItem("tdListDataset").split('<day>')[1].split('|').length;i++){
				let dayDiv = document.createElement('div');
				let dayChecker = document.createElement('div');
				let daySpan = document.createElement('span');
				let dayDel = document.createElement('div');

				daySpan.innerHTML = localStorage.getItem("tdListDataset").split('<day>')[1].split('|')[i];
				dayChecker.setAttribute("checked", "false");
				dayChecker.onclick = function(event, thisVar = dayDiv){
					if(this.attributes.checked.value=="false"){
						this.setAttribute("checked", "true");
					}
					thisVar.style = "opacity: 0";
					console.log(dm.manageDataline(localStorage.getItem("tdListDataset"), daySpan.innerHTML));
					//아래 코드는 버그임🧶🧶🧶🧵🧵🎨🎨🎨🧵🧵🦺
					//localStorage.setItem("tdListDataset", dm.manageDataline(localStorage.getItem("tdListDataset"), daySpan.innerHTML));
					dm.insertLog(daySpan.innerHTML);
					setTimeout(function(){
						document.querySelector('div#todayTODO').removeChild(thisVar);
					}, 300);
				}
				dayDel.onclick = function(event, thisVar = dayDiv){
					thisVar.style = "opacity: 0";
					localStorage.setItem("tdListDataset", dm.manageDataline(localStorage.getItem("tdListDataset"), daySpan.innerHTML));
					setTimeout(function(){
						document.querySelector('div#todayTODO').removeChild(thisVar);
					}, 300);
				}

				dayDiv.appendChild(dayChecker);
				dayDiv.appendChild(daySpan);
				dayDiv.appendChild(dayDel);

				document.querySelector("div#todayTODO").appendChild(dayDiv);
			}
		}
		
		dm.insertInputArea("div#todayTODO");
		
		
	},
	insertInputArea : function(thisString){
		let dayDiv = document.createElement('div');
		let daySpan = document.createElement('span');
		daySpan.setAttribute("contenteditable", "true");
		daySpan.setAttribute("spellCheck", "false");
		//엔터 누를 때 저장 이벤트
		daySpan.onkeydown = function(event, thisVar = dayDiv){
			if(event.key == "Enter"){
				event.preventDefault();
				document.querySelector(thisString).removeChild(thisVar);
				dm.singleQueUpdate(thisString, daySpan.innerHTML);
			}
		}
		dayDiv.appendChild(daySpan);

		document.querySelector(thisString).appendChild(dayDiv);
	},
	insertLog : function(newData){
		localStorage.setItem("tdListDataset", localStorage.getItem("tdListDataset").split("<log>")[0] + "<log>" + localStorage.getItem("tdListDataset").split("<log>")[1] + "|" + newData + "<log>" + localStorage.getItem("tdListDataset").split("<log>")[2]);
		let logDiv = document.createElement('div');
		let logSpan = document.createElement('span');
		
		logSpan.innerHTML = newData;
		logDiv.appendChild(logSpan);
		document.querySelector("div#RLog").appendChild(logDiv);
		
		
	},
	manageDataline : function(totalString, rectData){
		//totalString - 데이터 전문
		//rectData - 삭제할 데이터
		
		if((totalString.split(rectData)[0][(totalString.split(rectData)[0].length-1)] == "|") && (totalString.split(rectData)[1][0] != "|")){
			return totalString.split("|"+rectData)[0] + totalString.split("|"+rectData)[1];
		}
		if((totalString.split(rectData)[0][(totalString.split(rectData)[0].length-1)] == "|") || (totalString.split(rectData)[1][0] == "|")){
			return totalString.split(rectData+"|")[0] + totalString.split(rectData+"|")[1];
		}

	}
}