if(ctrlImg < pageNums){ctrlImg = pageNums;}
var ys = ctrlImg%showNums;
if(ys == 0){ys=showNums;}
var amountPage = Math.ceil(ctrlImg/showNums);
var creatImg = creatLists = cpTemp = "";
var count,pageLists,btn0,aaa,curPage;
var reg = /^[0-9]*$/;
var tf = false; 
//
var inputVal = a1 = str = serVal = serLists = aLen = "";
var serResuPages = serResuCount = 0;
var newPage_num = 1;
var arr = arr0 = arrTemp = arrLen = arrLen0 = strTemp = matWord  = tempStr = jieguo = cStr = new Array();

//
count = 1;
pageLists = ""; 
btn0 = "";
aaa = "";
curPage = 1;

function clearSer(){
   sessionStorage.clear();
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
/*滚动条监听*/
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
var firRun = true;
var indexVal = 0;
function sessExise(){
	if(sessionStorage.arr != undefined){
		document.getElementById("searchTxt").placeholder = "empty search restore";
		document.getElementById("searchTxt").className = "addLig";
		firRun = false;
		serLists = sessionStorage.arr;  //读取 搜索结果 数组
		arr = JSON.parse(serLists);        //重新转换为对象 
		amountPage = sessionStorage.getItem("setResu");
		for(var gStr=0; gStr < arr.length; gStr++){
			arr0.push( eval("count"+arr[gStr]) );
		}
	}
}
sessExise();
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

function creEle(){
	if(firRun == true){
	  indexVal = 0;
	}else{
	  indexVal = (curPage-1)*showNums;	// 取得当前页面最后一个的位置, 1-1=0; 0 乘 n 都=0
	}									// 从第2页 生效 arr[9] = 第2页 第一条数据 10.html
  document.getElementById("pageMount0").innerHTML = "Page "+curPage+"";
  document.getElementById("pageMount").innerHTML = " Total "+amountPage +"";
   creatLists="";
   if(amountPage > 1){             // 获取 当前页面 数据列表 数量 ,
	   if(curPage == amountPage){
		if(ys == 0){ys=showNums;}
		valTwo = ys;  
	   }else{
		valTwo = showNums;
	   }  
   }else{
	   ys = arr.length;
	   valTwo = ys;
   }
   for(var i=0; i<valTwo; i++){       // 取出当前页面的 每条数据, 写入 对应内容 
	if(arr[indexVal+i] <= pageNums){   // 取列表名，如果 n.html <= 列表总数139
	creatImg += "<li><a href='product/"+arr[indexVal+i]+".html'> <div class='imgSize'><img src='picture/new"+arr[indexVal+i]+"/"+"/1.jpg'/></div></a><div class='newsAllTitle'><p>"+arr0[indexVal+i]+"</p></div></li>";
	}else{                             // 没这条数据，写入 提示 信息
	  creatImg += "<li><a href='javascript:;'> <div class='imgSize'><img src='imgs/news.jpg'/></div></a><div class='newsAllTitle'><p>"+count0+"</p></div></li>";
	}
   }
   creatLists = creatLists + creatImg;
   document.getElementById("newsAll").innerHTML = creatLists;
   creatImg = "";
   setpage();
}

 function gotopage(nextNums) {
   document.getElementById("data_list").style.display="none";
   if(firRun == true){arr = []; arr0 = [];}  //  首次加载,清空 搜索结果 数据
   curPage = nextNums; 
   newPage_num = (curPage-1)*showNums+1;
  if(firRun == true){        // 无搜索结果,还原全部 内容
    ys = ctrlImg%showNums;
	if(curPage != amountPage){
	 for(var i=newPage_num; i<newPage_num+showNums; i++){
	  arr.push(i);
	  if(i <= pageNums){          
	   arr0.push( eval("count"+i) );
	  }else{
	    arr0.push(count0);
	  }
	 }
	}else{
	  if(amountPage == 1){
	    ys = showNums;
	  }
	  for(var i=newPage_num; i<newPage_num+ys; i++){
	   arr.push(i);
		 if(i <= pageNums){                 
		   arr0.push( eval("count"+i) );
		 }else{
		   arr0.push(count0);
		 }
	  }
	}
  }else{
	sessExise();
  }
  creEle();  
 } 

function setpage() {   // 初始化or重绘制 页数列表 prev 1 2 3 4 5 next
    if(amountPage>pageLen){         
        if(parseInt((curPage-1)/pageLen) == 0) {             
            for (count=1;count<=pageLen;count++) {
			 if(count!=curPage){
			  if(count <= amountPage){
			      aaa = "<a class='list0' href='javascript:;' onclick='gotopage("+count+")'>"+count+"</a>";
				  pageLists = pageLists + aaa;
			  }else{
				  aaa = "<a class='list1' href='javascript:;'>"+count+"</a>";
				  pageLists = pageLists + aaa;
			  }
			 }else{pageLists = pageLists + "<span class='list0 list2' >"+count+"</span>"; }
            } 
            btn0 += "<a class='isBtn1' href='javascript:;' onclick='otherPage("+count+")'> Next </a>"; 
        }else if(parseInt((curPage-1)/pageLen) == parseInt(amountPage/pageLen)){     
            btn0 += "<a class='isBtn0' href='javascript:;' onclick='otherPage("+(parseInt((curPage-1)/pageLen)*pageLen)+")'>Prev</a>"; 
            for (count=parseInt(amountPage/pageLen)*pageLen+1;count<=amountPage;count++){ 
 			 if(count!=curPage){
			 if(count <= amountPage){
			      aaa = "<a class='list0' href='javascript:;' onclick='gotopage("+count+")'>"+count+"</a>";
				  pageLists = pageLists + aaa;
			  }else{
				  aaa = "<a class='list1' href='javascript:;'>"+count+"</a>";
				  pageLists = pageLists + aaa;
			  }
			 }else{pageLists = pageLists + "<span class='list0 list2' >"+count+"</span>";}
            }
        }else{     
            btn0 += "<a class='isBtn0' href='javascript:;' onclick='otherPage("+(parseInt((curPage-1)/pageLen)*pageLen)+")'>Prev</a>"; 
            for (count=parseInt((curPage-1)/pageLen)*pageLen+1;count<=parseInt((curPage-1)/pageLen)*pageLen+pageLen;count++){ 
		      if(count!=curPage){
			  if(count <= amountPage){
			      aaa = "<a class='list0' href='javascript:;' onclick='gotopage("+count+")'>"+count+"</a>";
				  pageLists = pageLists + aaa;
			  }else{
				  aaa = "<a class='list1' href='javascript:;'>"+count+"</a>";
				  pageLists = pageLists + aaa;
			  }
			 }else{pageLists = pageLists + "<span class='list0 list2' >"+count+"</span>";}
            } 
            btn0 += "<a class='isBtn1' href='javascript:;' onclick='otherPage("+count+")'> Next </a>"; 
        } 
    }else{    
	  for (count=1;count<=amountPage;count++) { 
	    if(count!=curPage){
		 if(count <= amountPage){
			  aaa = "<a class='list0' href='javascript:;' onclick='gotopage("+count+")'>"+count+"</a>";
			  pageLists = pageLists + aaa;
		  }else{
			  aaa = "<a class='list1 list2' href='javascript:;'>"+count+"</a>";
			  pageLists = pageLists + aaa;
		  }
		 }else{pageLists = pageLists + "<span class='list0 list2' >"+count+"</span>";}
	   } 
	}
    document.getElementById("setpage").innerHTML = "<div id='setpage'>"+"<div class='aLists'>"+ pageLists+"<\/div>" + "<\/div>"; 
	
	document.getElementById("btnArea").innerHTML = "<div id='btnArea'>"+btn0+"<\/div>";	
	pageLists = ""; 
	btn0="";
    document.getElementById("pageMount").innerHTML = "Total "+amountPage;
} 
setpage();   
gotopage(1);

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
   // 提取 匹配串当键值// 
   // 把搜索串 当键值，== null 表示 不存在
   // 匹配时 获取 匹配串长度 循环 
function isstore(){
matchStr="";
arrss = [];
txtstore = {};
 for(var i=1; i <= pageNums; i++){ 
   str = eval("count"+i);
   str = str.replace(regs,"");  //使用| or空格 or, 分开单词, 匹配不能包含这些
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

/*方法延迟加载*/
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
var newcurTag = newcurTag0 = jword = tNum = 0;

function serCon(enDown){
  arr = [];
  arr0 = [];
  arrTemp = [];
  strTemp = [];
  arrLen = [];
  arrLen0 = [];
  inputVal = document.getElementById("searchTxt").value;
  inputVal = inputVal.replace(regs,"");
  isZh = inputVal.match(regZh);   //   汉字     字符 
 // isEng = inputVal.match(regEng);   // 汉字以外 字符 
  if(isZh != null /* && isZh.length >=1 */){  //存在中文, 并且N 个字 regZh 改为 全局匹配
		 matchRes = 2;
		 isstore();
  }else if(matchRes == 2){   // 曾调用中文块 
	  matchRes = 3;          // 则还原
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
	 str0 = eval("count"+i);       // 只用为 显示
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
	   var h = n = 0; 
	   txtstore = arrss[i-1];   // 取出当前所在 匹配串
	   for(var s=0;s<cutArr.length;s++){  //空格分词
	    n=0;  newcurTag0 = newcurTag; newcurTag = 0; firMat = 0; tNum=0;
		 for(var exised=0; exised < matWord.length; exised++){ 
		   if(cutArr[s] == matWord[exised]){  // 如果新单词 已经出现过 ，跳过 
		     jword = 1;                       
			 break;
		   }
		 } 
	    for( h=0;h<cutArr[s].length-(matchRes-1); h++){	
			if(jword == 1){jword = 0; break;}
			searchStr = cutArr[s].substr(h,matchRes);    // 循环 提取出 实际存在单词出现位置
		if(txtstore[searchStr] != undefined){ //输入内容当键值    
		    curTag = txtstore[searchStr];
			while(n <= cutArr[s].length-matchRes-h){
			  searchStr = cutArr[s].substr(h,cutArr[s].length-n-h);   // -n若匹配不到 减掉1位数 继续
			  var newReg = new RegExp("("+searchStr+")","i");   
			  jieguo = arrtxt[i-1].indexOf(searchStr,curTag); 					// 从新匹配串 查找内容
			  n++;
			  /*重叠检查*/
			  if(jieguo != -1){
				  for(var ts=0; ts < tempStr.length; ts++){  // 提取位置 & 长度
					cStr = tempStr[ts].split("-");
					if( (searchStr.length+jieguo-1 < parseInt(cStr[0]) || jieguo >= parseInt(cStr[0])+parseInt(cStr[1].length) ) /* && searchStr != cStr[1] */){   //单词出现过 也不加入,直接打断
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
					matWord.push(searchStr);
					n = cutArr[s].length+1;   // break 没生效...
					tempStr.push(jieguo+"-"+searchStr);
				 }
			  }
			  /**/
			 //  console.log("i="+i+" 匹配结果 "+jieguo+" 匹配串= "+arrtxt[i-1]+" 输入值= "+searchStr);
			}
			h = cutArr[s].length;
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
			//str0 = setColor(str0,matWord[m2]);
			aLen += matWord[m2];  			
		}
		arrLen.push(aLen);     // 两次匹配的 字符串拼接  
		arr0.push(str0);  
		arrTemp = [];
		strTemp = [];	
		arrLen0 = []; 
	   }
    }
  }
 

	var snTemp = 0;	
	function sortNumber(aL,aResu){          // 重新 排序	
	serResuCount = aL.length;
		if(aResu == 1){
			arr = arrTemp;
			arr0 = strTemp;
		/* 	for(var stCor = 0; stCor < arr0.length; stCor++){   //单个匹配 加颜色
				arr0[stCor] = setColor(arr0[stCor],aL[stCor]);
			} */
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
// 【获取 最长匹配长度 & 数量 再加入arr，其他不加】

    if(arr.length >= 1 /* || arrTemp.length >= 1 */ ){
        if(enDown == "ct0"){  // 只输出8个预览后打断,不记录结果
		  create_data();
		}else{           // 
		    serResuPages = Math.ceil(serResuCount/showNums);
			if(serResuCount > showNums){
			   ys = serResuCount%showNums;
			}else{
			   ys = 0;
			}
		   firRun = false;
		   amountPage = serResuPages;
//存入临时数据
		   serLists = JSON.stringify(arr);    //对象需转换为字符串
		   sessionStorage.arr = serLists;   //存入
		   sessionStorage.setItem("setResu",amountPage);
//
	       showAll();  // 
		}
	}
	 	
  }else if(inputVal == "" && enDown == "ct1" ){
	 document.getElementById("data_list").style.display="none";
	 document.getElementById("searchTxt").className = "";
	 amountPage = Math.ceil(ctrlImg/showNums);
	 firRun = true;
	 clearSer();
	 showAll();
  }else if(inputVal == ""){
	  document.getElementById("searchTxt").value = "";
	  document.getElementById("data_list").style.display="none";
	  if(sessionStorage.arr != undefined){
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
	 setpage();
	 gotopage(1);
	}else{
		document.getElementById("searchTxt").value = "";
	    document.getElementById("searchTxt").placeholder = "Search for Something";
		gotopage(1);
	}
 }
