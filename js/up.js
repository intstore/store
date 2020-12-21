var isUrl = window.location.href;
var start0 = top0 = pName = curCat = curFile = cur_url = "";
var curPage = 1;
function xyStr(a,b){
	start0 = isUrl.lastIndexOf(a);
	end0 = isUrl.lastIndexOf(b);
	return isUrl.substring(start0+1,end0);
}
top0 = isUrl.substr(0,isUrl.lastIndexOf("/")+1);
pName = xyStr("_",".");  
curCat = fName+((xyStr("/","_")).substring(fName.length))+"_";   
curFile = curCat+pName;
var curCat0 = xyStr("/",".").substring(fName.length,end0);  

function uLan(){
	var curLan = navigator.language||navigator.userLanguage;
	curLan = curLan.substr(0, 2);
	if(curLan == "th" || curLan == "vi"){
		lang = curLan;
	}
}
/*hidden other lang*/
var lang = "en";
var arrLang = ["en","th","vi"];
if(localStorage.lang != undefined){
	lang = localStorage.lang;
}else{
	uLan();
}

function hLang(){
	for(var l=0; l<arrLang.length; l++){
	  if(By(lang+"Lang") != null){
		if(lang != arrLang[l]){
			By(arrLang[l]+"Lang").style.display = "none";
			By(arrLang[l]+"Lang").innerHTML = "";  
		}
	  }
	}
}
hLang();
/**/

/*写入文本*/
var hUl = hLi = hFont = hBtn = hpic = ""; 							
hUl = "<ul class='dtUl'>";
hLi = "<li class='Lpic'><div class='tdPic'><img class='lazy' src='../imgs/load.gif' data-echo='../picture/view/";
hpic = ".jpg'/></div></li><li class='tdTxt'><span>";
end0 = parseInt(curCat.substring(fName.length,curCat.lastIndexOf("_")));

function wtxt(cPage){
	var k = 1; 
	var resH = ""; 
	var rNum = 0;
	var wSty = picNum0 = "";
   hFont = "<font class='"+fontSty[0]+"'>"+dtp[end0-1][cPage][0][lang]+"<br/></font><br>";
  
	for(var j=0; j<dtp[end0-1][cPage].length; j++){  
	rNum = Object.keys(dtp[end0-1][cPage][j]).length;  
	if(j == 0){rNum -= langSum;}
		while(k <= rNum){    		
			hFont += "<font class='"+fontSty[k-1]+"'>"+dtp[end0-1][cPage][j][k]+"<br/></font>";
			k++;
		}
		k = 1;
		picNum0 = "pd1[curFile]"+"["+(j)+"]";
		if(eval(picNum0) != undefined){wSty = "btn0";}else{wSty = "btn1";}
		hBtn = "</span><br/><div class='"+wSty+"'><a onclick='creatEle("+(j+1)+")'>More pic</a></div></li></ul>";
		resH += hUl+hLi+(curFile+"-"+(j+1)+hpic)+hFont+hBtn;
		hFont = "";
	}
	document.getElementById("showArea0").innerHTML = resH;
}
wtxt(curCat0); 
/**/

/*more pic*/
var curArea = "pd1";
var isLi = picNum = "";
var acWin = scrollTag = scrollTop0 = firC = speed = num = st = 0;

function fadeOut(cVal){
	  scrollTag = document.documentElement.scrollTop || document.body.scrollTop;
	  By("tempT").style.top = scrollTag+"px";
		
	  clearInterval(st); 
	  By("tempT").innerText = cVal;
	  speed = speed || 20 ;
	  num = 50;
	  st = setInterval(function(){
	  num--;
	  By("tempT").style.opacity = num / 25 ;
		  if(num <= 0){   
			clearInterval(st);  
		  }
	  },speed);
}
// arr[curPage-1] -> curCat0  
function creatEle(curPd_sel){
	if(curPd_sel != "cWin" && acWin == 0){
	//	picNum = curArea+"["+(arr[curPage-1]-1)+"]"+"["+(curPd_sel-1)+"]";
		picNum = curArea+"[curFile]"+"["+(curPd_sel-1)+"]";
		
		if(eval(picNum) != undefined){	
			picNum = eval(picNum);	 
			acWin = 1;
			for(var i=0; i < picNum; i++ ){
				isLi += "<li><img id='imgId"+i+"' class='lazy' src='../imgs/load.gif' data-echo='../picture/"+fName+curCat0+"/gp"+curPd_sel+"/"+(i+1)+".jpg'/></li>";
			}
			if(isLi != ""){
				By("cbtn0").style.display = "block";
				By("Cus0").style.display = "block";
				By("Cus0").innerHTML += "<ol>"+isLi+"</ol>";
				isLi = ""; 
			}
			scrollTag = document.documentElement.scrollTop || document.body.scrollTop;
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		}else{
			fadeOut("No more pic...");
		}
		
		picLazy();
	}else if(curPd_sel == "cWin"){
		By("Cus0").style.display = "none"; 
		By("Cus0").innerHTML = "";
		By("cbtn0").style.display = "none"; 
		isLi = "";
		acWin = 0;
		document.body.scrollTop = scrollTag;
		document.documentElement.scrollTop = scrollTag;
	}	
}
 
 // 
/**/

function picLazy(){
echo.init({
	offset: 400,
	throttle: 250,
	unload: false,
	callback: function (element, op) {
	// console.log(element, 'has been', op + 'ed')
		if(op === 'load') {
			element.classList.add('loaded');
		}else{
			element.classList.remove('loaded');
		}
	}
  });
}	
picLazy();

window.onscroll = function() {
	scrollTop0 = document.documentElement.scrollTop || document.body.scrollTop;
	switch(firC){
		case 0:
		if(scrollTop0 >= 200){
			firC = 1;
			By("dTop").style.display = "none";
			By("uTop").style.display = "block";
		}
		break;
		case 1:
		if(scrollTop0 < 200){
			firC = 0;
			By("dTop").style.display = "block";
			By("uTop").style.display = "none";
		}
		break;
	}
}

function By(id){
  return document.getElementById(id);
}
/* function otherStyle(cur_sel){
	if(pdMenu[0] > 1){	  //固定2欄目
		By("area"+cur_sel).className = "on";
		cur_sel = parseInt(cur_sel);  
		for(var i = 0; i < pdMenu[0]; i++){      
			if( cur_sel == i ){
				By("showArea"+i).style.display = "block"; 
			}else{
				By("area"+i).className = "";
				By("showArea"+i).style.display = "none"; 
			}
		}
	}
} */

var amountPage = Object.keys(dtp[end0-1]).length;   

if(localStorage.arr != undefined){  
	var serLists = localStorage.arr;  // 讀取
	arr = JSON.parse(serLists);       
	amountPage = arr.length;
}else{                 // 創建默認有序列表
	var arr = [];
	for(var j=amountPage; j>=1; j--){   
		arr.push(end0+"_"+j);    
	}
}
function getCurP(){ //初始化當前頁 位置  有搜索结果时 定位
	for(var i=0; i<arr.length;i++){
		if(curCat0 == arr[i]){
			curPage = i+1;
			break;
		}
	}
}	
getCurP();

var pageLists = btn0 = aaa = ""; 
var reg = /^[0-9]*$/;
var tf = false;
var pl = 1;

//
document.onkeydown = function(e){
	e = e||window.event;
	switch(e.keyCode) {
		case 37:
		  prevPage();
		  break;
		case 38:
		  document.body.scrollTop = 0;
		  document.documentElement.scrollTop = 0;
		  break;
		case 39:
		  nextPage();
		  break; 
      case 40:
		  window.scrollTo(0,document.body.scrollHeight);
		  break; 		  
	} 
}  
//
function nextPage(){   

 if(arr.length > 1){
	if(curPage < arr.length){
		curPage++;
		cur_url = top0+fName+arr[curPage-1]+".html";
		window.location.href = cur_url;
	}else{
		curPage = 1;
		cur_url = top0+fName+arr[0]+".html";
		window.location.href = cur_url;
	}
 }
}
function prevPage(){
 if(arr.length > 1){
	if(curPage > 1){
		curPage--;
		cur_url = top0+fName+arr[curPage-1]+".html";
		window.location.href = cur_url;
	}else{
		curPage = arr.length;
		cur_url = top0+fName+arr[arr.length-1]+".html";
		window.location.href = cur_url;
	}
 }
}

By("pageMount0").innerHTML = "Page "+(curPage)+"";
By("jump").placeholder = "Page "+curPage+""; 
By("pageMount").innerHTML = " Total "+amountPage+"";
function gotopage(newPage_num) {     
	pName = arr[newPage_num-1];
	window.location.href = top0+fName+pName+".html";
} 

/*create content list*/
var pVal0 = pVal1 = 0;
var sty0 = "<span class='list0 list2'>";
function setpage() {   // 初始化or重繪 頁面列表
	pVal0 = parseInt((curPage-1)/pageLen);
	pVal1 = parseInt(amountPage/pageLen);
	var p11 = 1;
	var p2 = amountPage;
	if(amountPage>pageLen){
		if(pVal0 == 0) { 
			p2 = pageLen;
			btn0 += "<a class='isBtn1' onclick='gotopage("+(p2+1)+")'> Next </a>"; 
		}else if(pVal0 == pVal1){
			p11 = pVal1*pageLen+1;
			p2 = amountPage;
			btn0 += "<a class='isBtn0' onclick='gotopage("+(pVal0*pageLen)+")'>Prev</a>";
		}else{
			p11 = pVal0*pageLen+1;
			p2 = pVal0*pageLen+pageLen;
			btn0 += "<a class='isBtn0' onclick='gotopage("+(pVal0*pageLen)+")'>Prev</a>"; 
			btn0 += "<a class='isBtn1' onclick='gotopage("+(p2+1)+")'> Next </a>"; 
		}
	}
	for(pl=p11; pl<=p2; pl++) {
		if(pl!=curPage){
			if(pl <= amountPage){
				aaa = "<a class='list0' onclick='gotopage("+pl+")'>"+pl+"</a>";
			}else{
				aaa = "<a class='list1'>"+pl+"</a>";
			}
			pageLists = pageLists + aaa;
		}else{pageLists = pageLists + sty0 +pl+"</span>"; }
	} 
	By("setpage").innerHTML = "<div id='setpage'>"+"<div class='aLists'>"+ pageLists+"<\/div>" + "<\/div>"; 
	By("btnArea").innerHTML = "<div id='btnArea'>"+btn0+"<\/div>";	
	pageLists = ""; 
	btn0="";
	By("pageMount").innerHTML = "Total "+amountPage;
} 

var cpTemp="";
function jumpPage(){
	cpTemp = By("jump").value ;
	tf = reg.test(cpTemp);
	curPage = parseInt(cpTemp);
	if(tf == true && curPage > 0 && curPage <= amountPage){ 	  
		By("jump").value="";
		pName = arr[curPage-1];
		window.location.href = top0+fName+pName+".html";
	}else{
		By("jump").value="";
		By("jump").placeholder = "1 - "+amountPage+"~";
	}
} 
setpage();

/*show view*/
var view0 = view1 = "";
function showView(){
	var trueN = 1;
	if(arr.length >=3 ){
		switch(curPage){
			case 1:
			view0 = "End";
			trueN = arr[curPage].substring(0,1);
			view1 = dtp[trueN-1][arr[curPage]][0][lang];
			break;
			case arr.length:
			trueN = arr[curPage-2].substring(0,1);
			view0 = dtp[trueN-1][arr[curPage-2]][0][lang];
			view1 = "First";
			break;
			default:
			trueN = arr[curPage-2].substring(0,1);
			view0 = dtp[trueN-1][arr[curPage-2]][0][lang];
			trueN = arr[curPage].substring(0,1);
			view1 = dtp[trueN-1][arr[curPage]][0][lang];
		}
	}else{
		view0 = "Prev";
		view1 = "Next";
	}
	By("prev").setAttribute("data-content", view0 );
	By("next").setAttribute("data-content", view1 );
}
showView();
/**/

/*end*/