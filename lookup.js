function randomsort(a, b) {
    return Math.random() > 0.5 ? -1 : 1; //��Math.random()��������0~1֮����������0.5�Ƚϣ�����-1��1
}
function random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
} //���ɷ�Χ�������


function Pause(obj,iMinSecond){      
   if (window.eventList==null) window.eventList=new Array();      
   var ind=-1;      
   for (var i=0;i<window.eventList.length;i++){      
       if (window.eventList[i]==null) {      
         window.eventList[i]=obj;      
         ind=i;      
         break;      
        }      
    }      
   if (ind==-1){      
   ind=window.eventList.length;      
   window.eventList[ind]=obj;      
   }      
  setTimeout("GoOn(" + ind + ")",iMinSecond);      
}      


function GoOn(ind){      
  var obj=window.eventList[ind];      
  window.eventList[ind]=null;      
  if (obj.NextStep) obj.NextStep();      
  else obj();      
}    


var firstCol = -1;
var firstRow = -1;
var secondCol = -1;
var secondRow = -1;
var state = 0; //0Ϊûѡ�У�1Ϊѡ��һ�š�
var c;
var ctx;
var imgArray = new Array();
var gameData = new Array();
var direct = 0; //1�����ϣ�2�����£�3������4������
var turnNum = 0;
var pathArray = new Array();
var  checkPathFlag=false;
function init() {
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    for (i = 0; i < 640 / 80; i++) {
        gameData[i] = new Array();
        for (j = 0; j < 960 / 60; j++) gameData[i][j] = -1;
    }
    //��ʼ����Ϸ����
    for (i = 1; i <= 10; i++) {
        var img = new Image();
        img.src = i + ".jpg";
        imgArray[i - 1] = img;
    }
}

function clickOnCanvas(event) {
var pauseFlag=false;
    var x = event.offsetX;
    var y = event.offsetY;
    if (x == null) x = event.layerX;
    if (y == null) y = event.layerY;
    var colNum = Math.ceil(x / 60) - 1;
    var rowNum = Math.ceil(y / 80) - 1;
    console.debug("X ����: " + x + ", Y ����: " + y + " ����: " + colNum + " ����: " + rowNum);
    if (state == 0) {
        firstCol = colNum;
        firstRow = rowNum;
        state = 1;
    } else if (state = 1) {
        if (firstCol != colNum || firstRow != rowNum) {
            secondCol = colNum;
            secondRow = rowNum;
            state = 0;
            if (gameData[firstRow][firstCol] == gameData[secondRow][secondCol]) {
                console.debug("���ε������ͬһ��ͼƬ,��ʼ���·���Ƿ������ι�����");
                if (checkPath(firstCol, firstRow, secondCol, secondRow)) {
				checkPathFlag=false;
				//drawPath(firstCol,firstRow);
				    drawBorder(secondCol,secondRow);
					pauseFlag=true;
                    console.debug("·��Ϊ��" + pathArray);
                    pathArray = new Array();
                    gameData[firstRow][firstCol] = -1;
                    gameData[secondRow][secondCol] = -1;
                }
            } else {
                console.debug("���ε������ͬһ��ͼƬ�����д���");
				 drawBorder(secondCol,secondRow);
				state=0;
            }
        }
		else
		state=0;
    }
 	
    drawCanvas();
}
//����·�����Ƿ������ι����ڣ�true���������ι����ڣ�false���������ι�����
function checkPath(firstCol, firstRow, secondCol, secondRow) {
if(firstCol<0||firstRow<0||firstCol>960/60||firstRow>640/80)return false;
    if (firstCol == secondCol && firstRow == secondRow)
{
checkPathFlag=true;	
return true;
}
    if (turnNum > 3) return false;

    if (secondRow == firstRow + 1 && secondCol == firstCol) {
        pathArray.push(2);
		checkPathFlag=true;
        return true;
    }
    if (secondRow == firstRow - 1 && secondCol == firstCol) {
        pathArray.push(1);
		checkPathFlag=true;
        return true;
    }
    if (secondCol == firstCol - 1 && secondRow == firstRow) {
        pathArray.push(3);
		checkPathFlag=true;
        return true;
    }
    if (secondCol == firstCol + 1 && secondRow == firstRow) {
        pathArray.push(4);
		checkPathFlag=true;
        return true;
    }

    //����
    if (!checkPathFlag&&secondRow < firstRow && firstRow != 0 && gameData[firstRow - 1][firstCol] <= 0) {
        console.debug("���ϣ���һ��Ϊ:"+ gameData[firstRow - 1][firstCol]);
        pathArray.push(1);
        direct = 1;
        if (direct != 1 && direct != 0) turnNum++;
        if (checkPath(firstCol, firstRow - 1, secondCol, secondRow))
{checkPathFlag=true;		return true;}
        else {
            if (direct != 1) {
                turnNum--;
                direct = 1;
            }
        }
    }

    //����
    if (!checkPathFlag&&secondRow > firstRow && firstRow < (640 / 80 - 1) && gameData[firstRow + 1][firstCol] <= 0) {
        console.debug("����,��һ��Ϊ:" + gameData[firstRow + 1][firstCol]);
        pathArray.push(2);
        direct = 2;
        if (direct != 2 && direct != 0) turnNum++;
        if (checkPath(firstCol, firstRow + 1, secondCol, secondRow)) {checkPathFlag=true;return true;}
        else {
            if (direct != 2) {
                turnNum--;
                direct = 2;
            }
        }
    }
    //����
    if (!checkPathFlag&&secondCol < firstCol && firstCol != 0 && gameData[firstRow][firstCol - 1] <= 0) {
        console.debug("����,��һ��Ϊ:" + gameData[firstRow][firstCol - 1]);
        pathArray.push(3);
        direct = 3;
        if (direct != 3 && direct != 0) turnNum++;
        if (checkPath(firstCol - 1, firstRow, secondCol, secondRow)) {checkPathFlag=true;return true;}
        else {
            if (direct != 3) {
                turnNum--;
                direct = 3;
            }
        }
    }

    //����
    if (!checkPathFlag&&secondCol > firstCol && firstCol < (960 / 60 - 1) && gameData[firstRow][firstCol + 1] <= 0) {
        console.debug("����,��һ��Ϊ:" + gameData[firstRow][firstCol + 1]);
        pathArray.push(4);
        direct = 4;
        if (direct != 4 && direct != 0) turnNum++;
        if (checkPath(firstCol + 1, firstRow, secondCol, secondRow)){checkPathFlag=true; return true;}
        else {
            if (direct != 4) {
                turnNum--;
                direct = 4;
            }
        }
    }
    pathArray.pop();
    return false;
}
function genGameData() {
    var dataPool = new Array();
    var poolSize = 0;
	var num1=0;
    for (i = 0; i < 640 / 80 / 2; i++) {
        for (j = 0; j < 960 / 60; j++) {
            var data = random( - 9, 9);
            gameData[i][j] = data;
            dataPool[poolSize++] = data;
        num1++;
		}
    }
    dataPool.sort(randomsort);
    for (i = 640 / 80 / 2; i < 640 / 80; i++) for (j = 0; j < 960 / 60; j++) {
        gameData[i][j] = dataPool[--poolSize];
	}
}
function startGame() {
    genGameData();
    drawCanvas();
}

function drawCanvas() {
    ctx.clearRect(0, 0, 960, 640);
    for (x = 0; x < 640 / 80; x++) for (y = 0; y < 960 / 60; y++) {
        var type = gameData[x][y];
        if (type >= 0) ctx.drawImage(imgArray[type], y * 60, x * 80);
        else continue;
    }
if(state==1)
{
if(gameData[firstRow][firstCol]>0)
drawBorder(firstCol,firstRow);
}
}

function drawBorder(col,row)
{
var x=col*60;
var y=row*80;
var width=60;
var height=80;
ctx.beginPath();
ctx.lineWidth="2";
ctx.strokeStyle="red"; // ��ɫ·��
ctx.moveTo(x,y);
ctx.lineTo(x+width,y);
ctx.lineTo(x+width,y+height);
ctx.lineTo(x,y+height);
ctx.lineTo(x,y);
ctx.stroke(); // ���л���
}


