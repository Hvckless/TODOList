var dm = {
	//싱글 큐 업대이트는 단일 기록을 업대이트 하는데 최적화된 함수
	singleQueUpdate : function(targetString, thisData){
		//console.log(targetString + " " + thisData);
		//ex. "div#todayTODO" "데이터"
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
				/*데이터 매니제가 사용되는 부분!! 🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃*/
				localStorage.setItem("tdListDataset", dm.manageDataline(localStorage.getItem("tdListDataset"), "<day>", dm.getCurrentRow(event, dayChecker, thisVar)));
				//console.log(dm.manageDataline(localStorage.getItem("tdListDataset"), "<day>", dm.getCurrentRow(event, dayChecker)));
				dm.insertLog(daySpan.innerHTML);
				thisVar.style = "opacity: 0";
				
				fm.scrollLog();
				
				setTimeout(function(){
					document.querySelector('div#todayTODO').removeChild(thisVar);
				}, 300);
				
			}
			dayDel.onclick = function(event, thisVar = dayDiv){
				/*📜📜📜데이터 삭제 버튼이 있는 구역!!!*/
				thisVar.style = "opacity: 0";
				//localStorage.setItem("tdListDataset", localStorage.getItem("tdListDataset").split(daySpan.innerHTML)[0]+localStorage.getItem("tdListDataset").split(daySpan.innerHTML)[2]);
				
				/*데이터 매니제가 사용되는 부분!! 🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃*/
				localStorage.setItem("tdListDataset", dm.manageDataline(localStorage.getItem("tdListDataset"), "<day>", dm.getCurrentRow(event, dayChecker, thisVar)));
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
				
				//여기여기여기
				logDiv.oncontextmenu = function(event, thisElement = logDiv){
					fm.redactLog(event, thisElement);
				}

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
					//console.log(dm.manageDataline(localStorage.getItem("tdListDataset"), daySpan.innerHTML));
					//아래 코드는 버그임🧶🧶🧶🧵🧵🎨🎨🎨🧵🧵🦺
					
					/*데이터 매니제가 사용되는 부분!! 🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃*/
					localStorage.setItem("tdListDataset", dm.manageDataline(localStorage.getItem("tdListDataset"), "<day>", dm.getCurrentRow(event, dayChecker, thisVar)));
					dm.insertLog(daySpan.innerHTML);
					
					fm.scrollLog();
					setTimeout(function(){
						document.querySelector('div#todayTODO').removeChild(thisVar);
					}, 300);
				}
				dayDel.onclick = function(event, thisVar = dayDiv){
					thisVar.style = "opacity: 0";
					/*데이터 매니제가 사용되는 부분!! 🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃*/
					localStorage.setItem("tdListDataset", dm.manageDataline(localStorage.getItem("tdListDataset"), "<day>", dm.getCurrentRow(event, dayChecker, thisVar)));
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
				document.querySelector("div#RContent").scrollTo(0, 999999);
			}
		}
		dayDiv.appendChild(daySpan);

		document.querySelector(thisString).appendChild(dayDiv);
	},
	insertLog : function(newData){
		localStorage.setItem("tdListDataset", localStorage.getItem("tdListDataset").split("<log>")[0] + "<log>" + localStorage.getItem("tdListDataset").split("<log>")[1] + "|" + newData + "<log>" + localStorage.getItem("tdListDataset").split("<log>")[2]);
		let logDiv = document.createElement('div');
		let logSpan = document.createElement('span');
		
		logDiv.onmousedown = function(event, thisElement = logDiv){
			fm.moveLog(event, thisElement);
		}
		logDiv.onmouseup = function(event, thisElement = logDiv){
			fm.endMoveLog(event, thisElement);
		}
		
		logSpan.innerHTML = newData;
		logDiv.appendChild(logSpan);
		document.querySelector("div#RLog").appendChild(logDiv);
		
		
	},
	manageDataline : function(totalString, location , rectDataRow){
		/*
		
			usage : dm.manageDataline("totalString", "location", num::rectDataRow);
			
			로케이션은 day log mon등을 나타낸다
		
			ex. dm.manageDataline("<log>데이터1|데이터2|데이터3<log>", "<log>" 3)
			 -> 세번째 데이터인 데이터 3을 삭제함.
		*/
		var splitArray = new Array;
		var resultString = "";
		splitArray = totalString.split(location)[1].split("|");
		
		for(i=0;i<splitArray.length;i++){
			if(i==rectDataRow){
			}else{
				resultString += splitArray[i]+"|";
			}
		}
		resultString = resultString.slice(0, -1);
		return totalString.split(location)[0] + location + resultString + location + totalString.split(location)[2];
	},
	getCurrentRow : function(thisEvent, thisElement, thisVar){
		//console.log(thisEvent);
		//console.log(thisElement);
		let targetPath = "optional";
		if(thisEvent.path == undefined){
			//MOZILA
			targetPath = thisEvent.target;
		}else{
			//CHROMIUM
			targetPath = thisEvent.path[0];
			
		}
		
		for(i=0;i<targetPath.parentElement.parentElement.children.length;i++){
			if(targetPath.parentElement.parentElement.children[i].children[1] === targetPath.parentElement.children[1]){
				return i;
			}
		}
	},
	dataChecker : function(){
		if(localStorage.getItem("tdListDataset") == null){
			var dataStructure = "<data>"
			var dataMapper = [
				"<log>",
				"<day>",
				"<mon>",
				"<indev>"
			]
			var resultString = ""

			resultString += dataStructure;
			for(i=0;i<dataMapper.length;i++){
				for(j=0;j<2;j++){
					resultString += dataMapper[i];
				}
			}
			resultString += dataStructure;
			localStorage.setItem("tdListDataset", resultString);
		}
	}
}