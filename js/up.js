//var pageNums = 2;          
var isUrl = window.location.href;
var start0 = isUrl.lastIndexOf("/");  
var end0 = isUrl.lastIndexOf(".");    
var top0 = isUrl.substr(0,start0+1);  
var curPage_num = isUrl.substring(start0+1,end0);   // url_name
curPage_num = parseInt(curPage_num);
var cur_url = top0+curPage_num+".html";
//
function uLan(){
	var curLan = navigator.language||navigator.userLanguage;
	curLan = curLan.substr(0, 2);
	if(curLan == "th"){
		lang = "th";
	}else if(curLan == "vi"){
		lang = "vn";
	}
}
/*hidden other lang*/
var lang = "en";
var arrLang = ["en","th","vn"];
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
		}
	  }
	}
}
hLang();
/**/
/*more pic*/
var curArea = "pd1";
var isLi = picNum = "";
var acWin = scrollTop = scrollTop0 = 0;
   function creatEle(curPd_sel){
	   curPage_num = parseInt(isUrl.substring(start0+1,end0));
	 if(curPd_sel != "cWin" && acWin == 0){
	 picNum = curArea+"["+(curPage_num-1)+"]"+"["+(curPd_sel-1)+"]";
     if(eval(picNum) != undefined){	
		picNum = eval(picNum);	 
        acWin = 1;
	     for(var i=0; i < picNum; i++ ){
		    isLi += "<li><img id='imgId"+i+"' class='lazy' src='../imgs/load.gif' data-echo='../picture/"+curPage_num+"/gp"+curPd_sel+"/"+(i+1)+".jpg'/></li>";
	     }
		 if(isLi != ""){
			 By("cbtn0").style.display = "block";
			 By("Cus0").style.display = "block";
			 By("Cus0").innerHTML += "<ol>"+isLi+"</ol>";
			 isLi = ""; 
		 }
       }
	   scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	   document.body.scrollTop = 0;
	   document.documentElement.scrollTop = 0;
	   
	   picLazy();
	 }else if(curPd_sel == "cWin"){
		By("Cus0").style.display = "none"; 
		By("Cus0").innerHTML = "";
		By("cbtn0").style.display = "none"; 
		isLi = "";
		acWin = 0;
		 document.body.scrollTop = scrollTop;
	    document.documentElement.scrollTop = scrollTop;
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
		} else {
		  element.classList.remove('loaded');
		}
    }
  });
}	
picLazy();

window.onscroll = function() {
  scrollTop0 = document.documentElement.scrollTop || document.body.scrollTop;
  if(scrollTop0 >= 200){
		By("dTop").style.display = "none";
		By("uTop").style.display = "block";
	}else{
		By("uTop").style.display = "none";
		By("dTop").style.display = "block";
	}
}

function otherStyle(cur_sel){
  if(pdMenu[0] > 1){	  //pdMenu[curPage_num-1] 固定2欄目
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
}
	if(localStorage.arr != undefined){  //news_all頁面 有執行搜索,并返回了 
		var serLists = localStorage.arr;  // 讀取
		arr = JSON.parse(serLists);       
		pageNums = arr.length;
		for(var i=0; i<arr.length;i++){
			if(curPage_num == arr[i]){
				curPage_num = i+1;
				break;
			}
		}
	}else{                 // 創建默認有序列表
		var arr = [];
		for(var j=1; j<=pageNums;j++){ 
		   arr.push(j);	
		}
	}


//
/*
var pageNumsIndex = isUrl.lastIndexOf("=");  // spilt page url arg
var url_name = isUrl.substr(pageNumsIndex);*/

var pl,pageLists,btn0,aaa,ccc; 
var reg = /^[0-9]*$/;
var tf = false;
   
pageLists = ""; 
btn0 = "";
aaa,ccc = "";
//
document.onkeydown = function(e){
	e = e||window.event;
	if (e.keyCode==37){
	  prevPage();
	 }
	if (e.keyCode==38){
	  document.body.scrollTop = 0;
	  document.documentElement.scrollTop = 0;
	}
	 if (e.keyCode==39){
	   nextPage();
	 }

	if (e.keyCode==40){
	  window.scrollTo(0,document.body.scrollHeight);
	} 
}  
//

  function nextPage(){
   if(curPage_num < arr.length){
	 curPage_num = arr[curPage_num];
     cur_url = top0+curPage_num+".html";
	 window.location.href = cur_url;
   }else{
     curPage_num = arr[0];
	  cur_url = top0+curPage_num+".html";
	  window.location.href = cur_url;
   } 
  }
  function prevPage(){
   if(curPage_num > 1){
     curPage_num = arr[curPage_num-2];
	 cur_url = top0+curPage_num+".html";
	 window.location.href = cur_url;
   }else{
     curPage_num = arr[arr.length-1];
	 cur_url = top0+curPage_num+".html";
	 window.location.href = cur_url;
   }
  }
 
var totalpage = pageNums;
document.getElementById("pageMount0").innerHTML = "Page "+(curPage_num)+"";
document.getElementById("jump").placeholder = "Page "+curPage_num+""; 
document.getElementById("pageMount").innerHTML = " Total "+pageNums +""; 
function gotopage(newPage_num) {     
    curPage_num = arr[newPage_num-1];
	window.location.href = top0+curPage_num+".html";
} 

function setpage(){
    if(totalpage>pageLen){         
        if(parseInt((curPage_num-1)/pageLen) == 0){             
            for (pl=1;pl<=pageLen;pl++) {
			   if(pl!=curPage_num){
				aaa = "<a class='list0' href='"+arr[pl-1]+".html'>"+pl+"</a>";
				ccc = "<a class='list1' href='javascript:;'>"+pl+"</a>";	
			    if(pl <= pageNums){
				 pageLists = pageLists + aaa;
				}else{
				   pageLists = pageLists + ccc;
				}
			  }else{pageLists = pageLists + "<span class='list0 list2' >"+pl+"</span>"; }
            } 
            btn0 += "<a class='isBtn1' href='javascript:;' onclick='gotopage("+pl+")'> Next </a>"; 
        }else if(parseInt((curPage_num-1)/pageLen) == parseInt(totalpage/pageLen)){     
            btn0 += "<a class='isBtn0' href='javascript:;' onclick='gotopage("+(parseInt((curPage_num-1)/pageLen)*pageLen)+")'>Prev</a>"; 
            for (pl=parseInt(totalpage/pageLen)*pageLen+1;pl<=totalpage;pl++){  
              if(pl!=curPage_num){			
			   	aaa = "<a class='list0' href='"+arr[pl-1]+".html'>"+pl+"</a>";
				ccc = "<a class='list1' href='javascript:;'>"+pl+"</a>";
				if(pl <= pageNums){
				  pageLists = pageLists + aaa;
				}else{
				   pageLists = pageLists + ccc;
				} 
			  }else{
				 pageLists = pageLists + "<span class='list0 list2' >"+pl+"</span>"; 
			  }
            } 
        }else{     
            btn0 += "<a class='isBtn0' href='javascript:;' onclick='gotopage("+(parseInt((curPage_num-1)/pageLen)*pageLen)+")'>Prev</a>"; 
            for(pl=parseInt((curPage_num-1)/pageLen)*pageLen+1;pl<=parseInt((curPage_num-1)/pageLen)*pageLen+pageLen;pl++){ 
			   if(pl!=curPage_num){
				aaa = "<a class='list0' href='"+arr[pl-1]+".html'>"+pl+"</a>";
				ccc = "<a class='list1' href='javascript:;'>"+pl+"</a>";
				if(pl <= pageNums){
				 pageLists = pageLists + aaa;
				}else{
				   pageLists = pageLists + ccc;
				}
			  }else{pageLists = pageLists + "<span class='list0 list2' >"+pl+"</span>"; }
            } 
            btn0 += "<a class='isBtn1' href='javascript:;' onclick='gotopage("+pl+")'> Next </a>"; 
        } 
    }else{    
	    for(pl=1;pl<=totalpage;pl++) { 
			aaa = "<a class='list0' href='"+arr[pl-1]+".html'>"+pl+"</a>";
			ccc = "<a class='list1' href='javascript:;'>"+pl+"</a>";		
		    if(pl!=curPage_num){ 
			   if(pl <= pageNums){
				 pageLists = pageLists + aaa;
				}else{
				   pageLists = pageLists + ccc;
				}
            }else{ 
                pageLists = pageLists + "<span class='list0 list2' >"+pl+"</span>"; 
            } 
        } 
	}
    document.getElementById("setpage").innerHTML = "<div style='position:relative' id='setpage'>"+"<br/>" + "<div class='aLists'>"+ pageLists+"<\/div>" + "<\/div>"; 
	
	document.getElementById("btnArea").innerHTML = "<div id='btnArea'>"+btn0+"<\/div>";
    pageLists = ""; 
	btn0="";
} 
var cpTemp="";
function jumpPage(){
  cpTemp = document.getElementById("jump").value ;
  tf = reg.test(cpTemp);
  curPage_num = parseInt(cpTemp);
  if(tf == true && curPage_num > 0 && curPage_num <= pageNums){ 	  
      document.getElementById("jump").value="";
	  curPage_num = arr[curPage_num-1];
	  window.location.href = top0+curPage_num+".html";
  }else{
     document.getElementById("jump").value="";
     document.getElementById("jump").placeholder = "1 - "+pageNums+"~";
  }
} 

function By(id){
  return document.getElementById(id);
}
setpage();  