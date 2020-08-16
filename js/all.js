if(ctrlImg < pageNums){ctrlImg = pageNums;}
var amountPage = Math.ceil(ctrlImg/showNums);
var creatImg = creatLists = cpTemp = "";
var pl,pageLists,btn0,aaa,curPage;
var reg = /^[0-9]*$/;
var tf = false; 
var lang = "en";
function uLan(){
	var curLan = navigator.language||navigator.userLanguage;
	curLan = curLan.substr(0, 2);
	if(curLan == "th"){
		lang = "th";
	}else if(curLan == "vi"){
		lang = "vn";
	}
}
if(localStorage.lang != undefined){
	lang = localStorage.lang;
}else{
	uLan();
}

/*search text*/
var catNums = document.getElementById("sKey").getElementsByTagName("a").length;
function catLan(){
	for(var i = 0; i < catNums; i++){
		document.getElementById("sKey").getElementsByTagName("a")[i].innerText = text0["mKey"+(i+1)+lang];
	}
}
catLan();
/**/

/*mobile menu*/
var mStatus = "none";
 function menuBar(){
   if(mStatus == "none"){
     document.getElementById("isMenu1").style.display = "block";
     document.getElementById("isMenu2").className = "on";
	 mStatus = "block";
   }
 }

document.getElementById("isMenu1").onclick = function(){
	document.getElementById("isMenu1").style.display = "none";
	document.getElementById("isMenu2").className = "off";
	mStatus = "none";
}

/**/

/*cat menu*/
function showCat(cVal){
	document.getElementById("searchTxt").value = cVal;
	serCon('ct1');
}
/**/

var inputVal = a1 = str = serVal = serLists = aLen = "";
var serResuPages = serResuCount = 0;
var newPage_num = 1;
var arr = arrTemp = arrLen = arrLen0 = strTemp = matWord = tempStr = jieguo = cStr = new Array();
var arr0 = []; 

pl = 1;
pageLists = ""; 
btn0 = "";
aaa = "";
curPage = 1;

function clearSer(){
   localStorage.clear();
	localStorage.lang = lang;
}
//clearSer();
//
document.onkeydown = function(e){
	e = e||window.event;
	if(event.target.id =="searchTxt"){
		if(e.keyCode==13 ){
		  timeoff =0; 
		  fnDelay("ct1"); //to cleartime =1  
	    }
	}else{
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
}
//
/**/
window.onscroll = function() {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if(scrollTop >= 200){
		document.getElementById("dTop").style.display = "none";
		document.getElementById("uTop").style.display = "block";
	}else{
		document.getElementById("uTop").style.display = "none";
		document.getElementById("dTop").style.display = "block";
	}
}
var valTwo = showNums;

var indexVal = 0;
function sessExise(){

	document.getElementById("searchTxt").placeholder = "empty search restore";
	document.getElementById("searchTxt").className = "addLig";

	serLists = localStorage.arr;  
	arr = JSON.parse(serLists);        
	amountPage = localStorage.getItem("setResu");
	for(var gStr=0; gStr < arr.length; gStr++){

		arr0.push( text0["count"+arr[gStr]+lang] );
	}

}

/*new123*/

function defpage() {
	for(var i = 1; i <= pageNums; i++){
		arr.push(i);
		arr0.push( text0["count"+i+lang] ); 	
	}
} 
if(localStorage.arr != undefined){
	sessExise();
}else{
	defpage();
}

function gotopage(nextNums){

  curPage = nextNums;
  indexVal = (curPage-1)*showNums;						
  document.getElementById("data_list").style.display="none";
  document.getElementById("pageMount0").innerHTML = "Page "+curPage+"";
  document.getElementById("pageMount").innerHTML = " Total "+amountPage +"";
   creatLists="";
  if(arr.length < 9){
	 valTwo = arr.length;
  }else{
	 valTwo = showNums; 
  }

   for(var i=0; i<valTwo; i++){       
	if(arr[indexVal+i] <= pageNums){  
	creatImg += "<li><a href='product/"+arr[indexVal+i]+".html'> <div class='imgSize'><img src='picture/view/"+arr[indexVal+i]+".jpg'/></div></a><div class='newsAllTitle'><p>"+arr0[indexVal+i]+"</p></div></li>";
	}else{                            
	  creatImg += "<li><a href='javascript:;'> <div class='imgSize'><img src='imgs/news.jpg'/></div></a><div class='newsAllTitle'><p>"+count0+"</p></div></li>";
	}
   }
   creatLists = creatLists + creatImg;
   document.getElementById("newsAll").innerHTML = creatLists;
   creatImg = "";
   setpage();
}
gotopage(1);

/**/


function setpage() {   // 初始化or重繪 頁面列表
    if(amountPage>pageLen){         
        if(parseInt((curPage-1)/pageLen) == 0) {             
            for (pl=1;pl<=pageLen;pl++) {
			 if(pl!=curPage){
			  if(pl <= amountPage){
			      aaa = "<a class='list0' href='javascript:;' onclick='gotopage("+pl+")'>"+pl+"</a>";
				  pageLists = pageLists + aaa;
			  }else{
				  aaa = "<a class='list1' href='javascript:;'>"+pl+"</a>";
				  pageLists = pageLists + aaa;
			  }
			 }else{pageLists = pageLists + "<span class='list0 list2' >"+pl+"</span>"; }
            } 
            btn0 += "<a class='isBtn1' href='javascript:;' onclick='otherPage("+pl+")'> Next </a>"; 
        }else if(parseInt((curPage-1)/pageLen) == parseInt(amountPage/pageLen)){     
            btn0 += "<a class='isBtn0' href='javascript:;' onclick='otherPage("+(parseInt((curPage-1)/pageLen)*pageLen)+")'>Prev</a>"; 
            for (pl=parseInt(amountPage/pageLen)*pageLen+1;pl<=amountPage;pl++){ 
 			 if(pl!=curPage){
			 if(pl <= amountPage){
			      aaa = "<a class='list0' href='javascript:;' onclick='gotopage("+pl+")'>"+pl+"</a>";
				  pageLists = pageLists + aaa;
			  }else{
				  aaa = "<a class='list1' href='javascript:;'>"+pl+"</a>";
				  pageLists = pageLists + aaa;
			  }
			 }else{pageLists = pageLists + "<span class='list0 list2' >"+pl+"</span>";}
            }
        }else{     
            btn0 += "<a class='isBtn0' href='javascript:;' onclick='otherPage("+(parseInt((curPage-1)/pageLen)*pageLen)+")'>Prev</a>"; 
            for (pl=parseInt((curPage-1)/pageLen)*pageLen+1;pl<=parseInt((curPage-1)/pageLen)*pageLen+pageLen;pl++){ 
		      if(pl!=curPage){
			  if(pl <= amountPage){
			      aaa = "<a class='list0' href='javascript:;' onclick='gotopage("+pl+")'>"+pl+"</a>";
				  pageLists = pageLists + aaa;
			  }else{
				  aaa = "<a class='list1' href='javascript:;'>"+pl+"</a>";
				  pageLists = pageLists + aaa;
			  }
			 }else{pageLists = pageLists + "<span class='list0 list2' >"+pl+"</span>";}
            } 
            btn0 += "<a class='isBtn1' href='javascript:;' onclick='otherPage("+pl+")'> Next </a>"; 
        } 
    }else{    
	  for (pl=1;pl<=amountPage;pl++) { 
	    if(pl!=curPage){
		 if(pl <= amountPage){
			  aaa = "<a class='list0' href='javascript:;' onclick='gotopage("+pl+")'>"+pl+"</a>";
			  pageLists = pageLists + aaa;
		  }else{
			  aaa = "<a class='list1 list2' href='javascript:;'>"+pl+"</a>";
			  pageLists = pageLists + aaa;
		  }
		 }else{pageLists = pageLists + "<span class='list0 list2' >"+pl+"</span>";}
	   } 
	}
    document.getElementById("setpage").innerHTML = "<div id='setpage'>"+"<div class='aLists'>"+ pageLists+"<\/div>" + "<\/div>"; 
	
	document.getElementById("btnArea").innerHTML = "<div id='btnArea'>"+btn0+"<\/div>";	
	pageLists = ""; 
	btn0="";
    document.getElementById("pageMount").innerHTML = "Total "+amountPage;
} 
setpage();   

function nextPage(){
	if(curPage < amountPage){
		gotopage(curPage+1);
	}else{
		gotopage(1); 
	}
}
function prevPage(){
	if(curPage > 1){
		gotopage(curPage-1);
	}else{
		gotopage(amountPage); 
	}
}
  
function otherPage(op){
	curPage = op;
	gotopage(curPage);
}

function jumpPage(){
  cpTemp = document.getElementById("jump").value ;
  tf = reg.test(cpTemp);
  curPage = parseInt(cpTemp);
  if(tf == true && curPage > 0 && curPage <= amountPage){ 	  
      document.getElementById("jump").value="";
      document.getElementById("jump").placeholder = "Page "+curPage+"";
	  setpage();
	  gotopage(curPage); 
  }else{
     document.getElementById("jump").value="";
     document.getElementById("jump").placeholder = "1 - "+amountPage+"~";
  }
}  

var regs = 
/[`~!@#$^&*()={}':;'\\\[\]\.<>\/?~！@#￥……&*（）——【】'；：""'。，、？/]/g;
var regZh = /[\u4E00-\u9FA5\uF900-\uFA2D/]/i;
var regEng = /[^\u4E00-\u9FA5\uF900-\uFA2D/]/i;
var isZh = 0;
var matchRes = 3;
var searchStr = searchStr0 = matchStr = "";
var txtstore = {};
var arrss = arrtxt = cutArr = [];
 
function isstore(){
matchStr="";
arrss = [];
txtstore = {};
 for(var i=1; i <= pageNums; i++){ 
   str = text0["count"+i+lang];
   str = str.replace(regs,"");  // | or空格 or, 分單詞,匹配不能包含這些
   str = str.replace(/\s{2,}/g," ");
   str = str.toLowerCase();
   arrtxt.push(str);
   for(var j=0; j < str.length-(matchRes-1); j++){  
	  matchStr = str.substr(j,matchRes);
      if(txtstore[matchStr] == undefined){	  
		txtstore[matchStr] = j;
	  }
   }
   arrss.push(txtstore); 
   txtstore = {};
 } 
}
isstore();

/*延遲加載*/
var timer = null;
var timeoff = 50;

function fnDelay(enDown){
	 clearTimeout(timer);
	 timer = setTimeout(function(){ 
		serCon(enDown);         
	}, timeoff)
	timeoff = 50;   
} 
/**/
var nextStr = curTag = firMat = 0;
var newcurTag = newcurTag0 = jword = tNum = cuted = 0;
/*空格分詞,不分開視爲1個單詞*/
function serCon(enDown){
  arr = [];
  arr0 = [];
  arrTemp = [];
  strTemp = [];
  arrLen = [];
  arrLen0 = [];
  inputVal = document.getElementById("searchTxt").value;
  inputVal = inputVal.replace(regs,"");
  isZh = inputVal.match(regZh);   //  
 // isEng = inputVal.match(regEng);   // 漢字以外
  if(isZh != null /* && isZh.length >=1 */){  
		 matchRes = 2;
		 isstore();
  }else if(matchRes == 2){   // 
	  matchRes = 3;          // 
	  isstore();
  }
  if(inputVal.length >= matchRes){ 
    for(var i=1; i<=pageNums; i++){
		newcurTag = 0;
		jword = 0;
		aLen = "";
		tempStr = [];
		matWord=[];
	if(enDown == "ct0"){
	 if(arr.length >= 8 || arrTemp.length >= 8){
	   break;
	 }	
	}	                    
	 str0 = text0["count"+i+lang];       // 只作顯示用
	 inputVal = inputVal.toLowerCase();
	 cutArr = inputVal.split(/\s+/); 
	 for(var c = 0; c < cutArr.length-1; c++){
	   for(var ci = c; ci < cutArr.length-1; ci++){
		 if(cutArr[c].length < cutArr[ci+1].length){
			 var cTemp = cutArr[c];
			 cutArr[c] = cutArr[ci+1];
			 cutArr[ci+1] = cTemp;
		 }
	   } 
	 }

     if(inputVal.length >= matchRes){
	   var h = n = matTag = 0; 
	   txtstore = arrss[i-1];   // 取當前 數據串
	   for(var s=0;s<cutArr.length;s++){  //空格分詞
	    n=0;  newcurTag0 = newcurTag; newcurTag = 0; firMat = 0; tNum=0; cuted = 0;
		 for(var exised=0; exised < matWord.length; exised++){ 
		   if(cutArr[s] == matWord[exised]){  // 單詞出現過,跳過 
		     jword = 1;                       
			 break;
		   }
		 } 
	    for( h=1;h<=cutArr[s].length-(matchRes-1); h++){	
			if(jword == 1){jword = 0; break;}
			searchStr = cutArr[s].substr(h-1,matchRes); // 循環 提取 能匹配的單詞位置
		if(txtstore[searchStr] != undefined){    
		    curTag = txtstore[searchStr];
			while(n <= cutArr[s].length-matchRes-(h-1)){
			  searchStr = cutArr[s].substr(h-1,cutArr[s].length-n-(h-1));   // -n若匹配不到退掉1位數,繼續
			  var newReg = new RegExp("("+searchStr+")","i");   
			  jieguo = arrtxt[i-1].indexOf(searchStr,curTag); 					// 從新匹配字符 找搜索串
			  n++;
			  matTag++;
			  /*重叠检查*/
			  if(jieguo != -1){
				  for(var ts=0; ts < tempStr.length; ts++){  // 提取位置 & 長度
					cStr = tempStr[ts].split("-");
					if( (searchStr.length+jieguo-1 < parseInt(cStr[0]) || jieguo >= parseInt(cStr[0])+parseInt(cStr[1].length) ) /* && searchStr != cStr[1] */){   //單詞出現過不再加入,直接打断
						tNum = 0;
					}else{    /* else if(searchStr == cStr[1]){break;}    */  
						tNum = 1;
						if(arrtxt[i-1].length-matchRes >= parseInt(cStr[0])+parseInt(cStr[1].length)){
							curTag = 0;  // 
							curTag += parseInt(cStr[0])+parseInt(cStr[1].length);
							n = 0;
						}else{  //cutArr[s].length-(n) <= matchRes
							n = cutArr[s].length+1;
						}
						break;
					}
				  }
				 if(tNum == 0){            // null
				    str0 = setColor(str0,searchStr);
					if(cuted == 1){  // 同個單詞分割過,合并為1個單詞
						var tpStr = matWord[matWord.length-1]+searchStr;
						matWord.splice(matWord.length-1,1,tpStr);
					}else{
						matWord.push(searchStr);
					}
					n = cutArr[s].length+1;   // break 沒生效...
					tempStr.push(jieguo+"-"+searchStr);
				 }
			  }
			  /**/
			}
			if(matTag >= matchRes){
				cutArr[s] = cutArr[s].substr(searchStr.length,cutArr[s].length);
				h = 0;
				n = 0;
				matTag = 0;
				cuted = 1;
			}else{
				h = cutArr[s].length;	
			}
		  }
		} 
	   }
	   if(arr.length == 0 && matWord.length == 1){
		 arrTemp.push(i); arrLen0.push(matWord[0]); strTemp.push(str0);
	   }
	   //
	   if(matWord.length >= 2){
		arr.push(i);  
		for(var m2 = 0; m2 < matWord.length; m2++){
			aLen += matWord[m2];  			
		}
		arrLen.push(aLen);     // 2次匹配 字符串拼接 
		arr0.push(str0);  
		arrTemp = [];
		strTemp = [];	
		arrLen0 = []; 
	   }
    }
  }
 

	var snTemp = 0;	
	function sortNumber(aL,aResu){          
	serResuCount = aL.length;
		if(aResu == 1){
			arr = arrTemp;
			arr0 = strTemp;
		}
		
		for(var i = 0; i < aL.length-1; i++ ){
			for(var j = 0; j < aL.length-1-i; j++) {
				if(aL[j].length < aL[j+1].length) {
					
					snTemp = aL[j+1];       
					aL[j+1] = aL[j];
					aL[j] = snTemp; 
					
					snTemp = arr[j+1];   
					arr[j+1] = arr[j];
					arr[j] = snTemp; 
					
					snTemp = arr0[j];
					arr0[j] = arr0[j+1];
					arr0[j+1] = snTemp;

				}
			}
		}	
	} 

	function selArr(){
		if(arr.length >=1){
		  sortNumber(arrLen,0);
		}else if(arrTemp.length >= 1){
		  sortNumber(arrLen0,1);
		} 
	}
	selArr(); 


    if(arr.length >= 1 /* || arrTemp.length >= 1 */ ){
        if(enDown == "ct0"){  
		  create_data();
		}else{           // 
		   serResuPages = Math.ceil(serResuCount/showNums);
		   amountPage = serResuPages;
//存臨時數據
		   serLists = JSON.stringify(arr);    //對象轉字符串
		   localStorage.arr = serLists;   //存入
		   localStorage.setItem("setResu",amountPage);
//
	       showAll();  // 
		}
	}
	 	
  }else if(inputVal == "" && enDown == "ct1" ){
	 document.getElementById("data_list").style.display="none";
	 document.getElementById("searchTxt").className = "";
	 amountPage = Math.ceil(ctrlImg/showNums);
	
	 clearSer();
	  //console.log(localStorage.lang+" cur Lang = "+lang);
	 showAll();
  }else if(inputVal == ""){
	  document.getElementById("searchTxt").value = "";
	  document.getElementById("data_list").style.display="none";
	  if(localStorage.arr != undefined){
		  document.getElementById("searchTxt").placeholder = "empty search restore";
		  document.getElementById("searchTxt").className = "addLig";
	  }else{
		  document.getElementById("searchTxt").className = "";
		  document.getElementById("searchTxt").placeholder = "Search for Something";
	  }
	  
  }
  serResuCount = 0;
}
/* Sear alert */
 function setColor(str, key){
	var reg0 = new RegExp("(" + key + ")", "gi");
	var newstr = str.replace(reg0,"<font style='background:#de121291;'>$1</font>");
	return newstr;
} 
var get_list = document.getElementById("data_list").getElementsByTagName("li");
var add_item = optioned = "";
//var showLists = 0;
function create_data() {
	add_item = ""; 
//	if(arr.length >=8){ showLists = 8;}else{showLists = arr.length;}
	for(var i = 0; i < arr.length; i++) {
		 
		optioned = "./product/"+arr[i]+".html";
		add_item += 
		"<li class='link_li'>"+
			"<a href=\""+optioned+"\"onclick=\"serCon('ct1')\">"+arr0[i]+"</a>"+
		"</li>"
	}
	
	document.getElementById("data_list").innerHTML = add_item; 
	document.getElementById("data_list").style.display="block";
 } 
 
function showAll(){
	if(arr.length > 0){
		document.getElementById("searchTxt").placeholder = "empty search restore";
		document.getElementById("searchTxt").className = "addLig";
		setpage();
		gotopage(1);
	}else{
		document.getElementById("searchTxt").value = "";
		document.getElementById("searchTxt").placeholder = "Search for Something";
		defpage();
		gotopage(1);
	}
}