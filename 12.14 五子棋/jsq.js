var ind=0;
var qipan=new Array();
var last;
var turn=-1;
var win;
var lnum=0;
var rnum=0;
var whw=false;
function onld(){
	$("neil").style.backgroundPositionY="0px";
	$("neir").style.backgroundPositionY="0px";
	$("neil").style.backgroundImage="";
	$("neir").style.backgroundImage="";
	$("neir").style.backgroundColor="";
	$("neil").style.backgroundColor="";
	add();
}
function add(){
	
	$("neil").innerHTML=lnum;
	$("neir").innerHTML=rnum;
	$("midmid").innerHTML="游戏开始";
	$("lf").innerHTML="<img src='image/h.png'/>";
	$("rt").innerHTML="";
	ind=0;
	$("forget").disabled=true;
	$("lost").disabled=true;
	for(var x=0;x<15;x++)
		qipan[x]=new Array();
	for(var i=0;i<196;i++)
	{
		if(i==0||i==13||i==182||i==195)
			$("box").innerHTML+="<div class='a"+i+"' id='"+i+"' onclick='onc(this.id)'></div>";
		else $("box").innerHTML+="<div class='a' id='"+i+"' onclick='onc(this.id)'></div>";
		if(i>0&&i<13)
			$(i).className="shang";
		if(i%14==0)
			if(i/10>0&&i/10<17)
				$(i).className="zuo";
		if(i%14==0)
			if(i/10>2&&i/10<19)
				$(i-1).className="you";
		if(i>182&&i<195)
			$(i).className="xia";
	}
}
function replay(){
	$("forget").disabled=false;
	$("lost").disabled=false;
	whw=false;
	$("box").innerHTML="";
	add();
}
function lost(){
	if(turn==0)
		win="黑棋";
	else if(turn==1)
		win="白棋";
	wing();
	$("forget").disabled=true;
	$("lost").disabled=true;
}
var lfw;
var riw;;
function wing(){
	lfw=parseInt($("neil").style.backgroundPositionY);
	riw=parseInt($("neir").style.backgroundPositionY);
	if(win=="黑棋")
	{
		islok=true;
		$("neil").style.backgroundColor="#00A2E8";
		lnum++;
		lfw-=5;
		$("neil").innerHTML=lnum;
		$("neil").style.backgroundPositionY=lfw+"px";
	}
	else if(win=="白棋")
	{
		isrok=true;
		$("neir").style.backgroundColor="#00A2E8";
		rnum++;
		riw-=5;
		$("neir").innerHTML=rnum;
		$("neir").style.backgroundPositionY=riw+"px";
	}
	$("forget").disabled=true;
	$("lost").disabled=true;
	whw=true;
	if(win=="黑棋"||win=="白棋")
		$("midmid").innerHTML="恭喜！"+win+"获得胜利！！！";
	qb();
	//water();
	
}
var wotnum=0;
var wottm;
var islok=false;
var isrok=false;
wottm=setInterval("water()",200);
function water(){
	if(wotnum<4){
		if(islok)
			$("neil").style.backgroundImage="url(water/"+wotnum+".png)";
		if(isrok)
			$("neir").style.backgroundImage="url(water/"+wotnum+".png)";
		wotnum++;
	}
	else wotnum=0;
}
var tmot;
var numb=0;
function qb(){
	if(parseInt(numb)<15)
	{
		$("qbl").style.backgroundImage="url(bb/"+numb+".png)";
		$("qbr").style.backgroundImage="url(bb/"+numb+".png)";
		numb++;
		tmot=setTimeout("qb()",150); 
	}
	else 
	{
		clearTimeout(tmot);
		numb=0;
			$("qbl").style.backgroundImage="";
		$("qbr").style.backgroundImage="";
	}
}
function hq(){
		if(last!=-1){
			$(last).innerHTML="";
			qipan[Math.floor(last/14)][last%14]=-1;
			ind--;
			last=-1;
			if(ind%2==0)
			{
				
				$("lf").innerHTML="<img src='image/h.png'/>";
				$("rt").innerHTML="";
			}
			else {
				$("lf").innerHTML="";
				$("rt").innerHTML="<img src='image/b.png'/>";
			}
			$("forget").disabled=true;
		}
}

function onc(id){

	if(!whw)
	if($(id).innerHTML==""){
		$("forget").disabled=false;
		$("lost").disabled=false;
		if(ind%2==0)
		{
			$("midmid").innerHTML="轮到白方落子——>";
			$(id).innerHTML="<div class='black'><div>";
			$("lf").innerHTML="";
			$("rt").innerHTML="<img src='image/b.png'/>";
			//	iswin(b);
		}
		else {
			$("midmid").innerHTML="<——轮到黑方落子";
			$(id).innerHTML="<div class='white'><div>";
			//	iswin(w);
			$("lf").innerHTML="<img src='image/h.png'/>";
			$("rt").innerHTML="";
		}
		qipan[Math.floor(id/14)][id%14]=parseInt(ind%2);
		iswin(Math.floor(id/14),id%14,parseInt(ind%2));
		last=id;
		turn=ind%2;
		ind++;
	}
}
function iswin(a,b,c){
	if(c==0)
		win="黑棋";
	else if(c==1)
		win="白棋";
	if(heng(a,b,c)||shu(a,b,c)||pie(a,b,c)||na(a,b,c))
		wing();
}


function heng(a,b,c){
	var len=1;
	var left=true;
	var right=true;
	for(var l=1;l<=4;l++)
	{
		if(right)
			if(qipan[a][b]==qipan[a][b+l])
			{
				len++;
				right=true;
			}
			else right=false;
		if(left)
			if(qipan[a][b]==qipan[a][b-l])
			{
				len++;
				left=true;
			}
			else left=false;
		if(!right&&!left)
			break;	
	}
	if(len>=5)
		return 1;
	else return 0;
}
function shu(a,b,c){
	var len=1;
	var top=true;
	var down=true;
	for(var l=1;l<=4;l++)
	{
		if(down)
			if(qipan[a][b]==qipan[a+l][b])
			{
				len++;
				down=true;
			}
			else down=false;
		if(top)
			if(a-l>=0)
			if(qipan[a][b]==qipan[a-l][b])
			{
				len++;
				top=true;
			}
			else top=false;
		if(!down&&!top)
			break;	
	}
	if(len>=5)
		return 1;
	else return 0;
}
function pie(a,b,c){
	var len=1;
	var top=true;
	var down=true;
	for(var l=1;l<=4;l++)
	{
		if(down)
			if(qipan[a][b]==qipan[a+l][b-l])
			{
				len++;
				down=true;
			}
			else down=false;
		if(top)
			if(a-l>=0)
			if(qipan[a][b]==qipan[a-l][b+l])
			{
				len++;
				top=true;
			}
			else top=false;
		if(!down&&!top)
			break;	
	}
	if(len>=5)
		return 1;
	else return 0;
}
function na(a,b,c){
	var len=1;
	var top=true;
	var down=true;
	for(var l=1;l<=4;l++)
	{
		if(down)
			if(qipan[a][b]==qipan[a+l][b+l])
			{
				len++;
				down=true;
			}
			else down=false;
		if(top)
			if(a-l>=0)
				if(b-l>=0)
			if(qipan[a][b]==qipan[a-l][b-l])
			{
				len++;
				top=true;
			}
			else top=false;
		if(!down&&!top)
			break;	
	}
	if(len>=5)
		return 1;
	else return 0;
}


function $(id){
	return document.getElementById(id);
}