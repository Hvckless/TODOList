window.onload = function(){
	__init();
}

function __init(){
	//이벤트 리스너 추가
	addEventOnMenuBtn();
	
	//dm.dataVerify();
	dm.dataChecker();
	dm.initBuildStruct();
	//데이터 불러오기
	//dm.loadDataset();
	
	//기록과 컨텍스트 최 하단으로 내리기
	fm.scrollLog();
	fm.scrollContext();
}