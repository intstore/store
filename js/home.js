localStorage.removeItem("arr");
var lang = "en";
function uLan(){
	var curLan = navigator.language||navigator.userLanguage;
	curLan = curLan.substr(0, 2);
	if(curLan == "th" || curLan == "vi"){
		lang = curLan;
	}
}
if(localStorage.lang == undefined){
	uLan();
	localStorage.lang = lang;
}else{
	lang = localStorage.lang;
}

function cLang(cLan){
   lang = cLan;
	localStorage.lang = lang;
	catLan();
	wHome();
}

var mStatus = "none";
function menuBar(){
	if(mStatus == "none"){
		By("isMenu1").style.display = "block";
		By("isMenu2").className = "on";
		mStatus = "block";
	}
}
By("isMenu1").onclick = function(){
	By("isMenu1").style.display = "none";
	By("isMenu2").className = "off";
	mStatus = "none";
}

/**/
var firC = scrollTag = 0;
window.onscroll = function() {
	scrollTag = document.documentElement.scrollTop || document.body.scrollTop;
	switch(firC){
		case 0:
		if(scrollTag >= 200){
			firC = 1;
			By("dTop").style.display = "none";
			By("uTop").style.display = "block";
		}
		break;
		case 1:
		if(scrollTag < 200){
			firC = 0;
			By("dTop").style.display = "block";
			By("uTop").style.display = "none";
		}
		break;
	}
}
 
/*search text*/
var catNums = (Object.keys(text1).length)/3; 
function catLan(){
	var aaa = "";
	for(var i = 0; i < catNums; i++){
		 aaa += "<a href='#' onclick='showCat("+i+")'>"+text1["mKey"+(i+1)+lang]+"</a>";
	}
	By("sKey").innerHTML = aaa;
}
catLan();

var selCat = "";
function showCat(cVal){
   localStorage.selCat = cVal;
	location.href = "news_all.html";
}
/**/

var hOut = hdiv = curName = "";
var sList = 1;
function wHome(){
	var resH = ""; 
	hOut = curName = "";
	By("hCat").innerHTML = "";
	for(var i=0; i<dtp.length; i++){
		hOut = "<div class='pd home'><div class='pd_title'><p class='TL'>"+text1["mKey"+(i+1)+lang]+"</p></div> <div class='ser_group'>";
		if(Object.keys(dtp[i]).length > 6){sList = 6;}else{sList = Object.keys(dtp[i]).length;}
		for(var j=sList; j>=1; j--){
			curName = (i+1)+"_"+j;   
			hdiv += "<div class='ser_box'><a class='full' href='file/"+fName+(i+1)+"_"+j+".html'></a><div class='img'><img src='picture/view/"+fName+(i+1)+"_"+j+"-1.jpg' alt='"+dtp[i][curName][0][lang]+"'/><span>"+dtp[i][curName][0][lang]+"</span><div class='box_layer'></div></div><p>"+dtp[i][curName][0][lang]+"</p></div>";
		}
		resH += hOut+hdiv+"</div></div>"+"<div class='moreC' onclick='showCat("+(i)+")'><span>More</span></div>";
		hdiv = "";
	}
	By("hCat").innerHTML = resH;
}
wHome();
var st = speed = num = 0;
function fadeOut(cVal){
	By("tempT").style.display = "block";
	//By("tempT").style.top = 50+"px";
	clearInterval(st); 
	By("tempT").innerText = cVal;
	speed = speed || 20 ;
	num = 50;
	st = setInterval(function(){
		num--;
		By("tempT").style.opacity = num / 25 ;
		if(num <= 0){   
			clearInterval(st); 
			By("tempT").style.display = "none";
		}
	},speed);
}

function cMess(val, m){
	var cTArea = document.createElement("input"); 
	cTArea.setAttribute("value", val); 
	document.body.appendChild(cTArea); 
	cTArea.select();
	document.execCommand("copy"); 
	document.body.removeChild(cTArea);
	if(m == null){
		fadeOut(val+" คัดลอกเสร็จสมบูรณ์");
	}else{
		fadeOut(m);
	}
}
function By(id){
	return document.getElementById(id);
}