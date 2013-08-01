function randomsort(a, b) {
    return Math.random() > 0.5 ? -1 : 1; //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}
function random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
} //生成范围内随机数
var firstCol = -1;
var firstRow = -1;
var secondCol = -1;
var secondRow = -1;
var state = 0; //0为没选中，1为选中一张。
var c;
var ctx;
var imgArray = new Array();
var gameData = new Array();
var direct = 0; //1代表上，2代表下，3代表左，4代表右
var turnNum = 0;
var pathArray = new Array();
function init() {
    c = document.getElementById("myCanvas");
	ctx = c.getContext("2d");
    for (i = 0; i < 640 / 80; i++) {
        gameData[i] = new Array();
        for (j = 0; j < 960 / 60; j++) gameData[i][j] = -1;
    }
    //初始化游戏数据
    for (i = 1; i <= 10; i++) {
        var img = new Image();
        img.src = i + ".jpg";
        imgArray[i - 1] = img;
    }
}

function clickOnCanvas(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    var colNum = Math.ceil(x / 60) - 1;
    var rowNum = Math.ceil(y / 80) - 1;
    console.debug("X 坐标: " + x + ", Y 坐标: " + y + " 列数: " + colNum + " 行数: " + rowNum);
    if (state == 0) {
        firstCol = colNum;
        firstRow = rowNum;
        state = 1;
    } else if (state = 1) {
        secondCol = colNum;
        secondRow = rowNum;
        state = 0;
        if (gameData[firstRow][firstCol] == gameData[secondRow][secondCol]) {
            console.debug("两次点击的是同一张图片,开始检查路径是否在三次拐弯内");

            if (checkPath(firstCol, firstRow, secondCol, secondRow)) {
                console.debug("路径为：" + pathArray);
                pathArray = new Array();

                gameData[firstRow][firstCol] = -1;
                gameData[secondRow][secondCol] = -1;
            }
        } else {
            console.debug("两次点击不是同一张图片，进行处理");
        }
    }
    drawCanvas();
}
//检验路径，是否在三次拐弯内，true代表在三次拐弯内，false代表不在三次拐弯内
function checkPath(firstCol, firstRow, secondCol, secondRow) {
    if (firstCol == secondCol && firstRow == secondRow) return true;
    if (turnNum > 3) return false;
    //向上
    if (firstRow != 0 && gameData[firstRow - 1][firstCol] >= 0) {
        pathArray.push(1);
        direct = 1;
        if (direct != 1) turnNum++;
        if (checkPath(firstRow - 1, firstCol, secondCol, secondRow)) return true;
        else {
            if (direct != 1) {
                turnNum--;
                direct = 1;
            }
        }

    }
    //向下
    if (firstRow < (640 / 80 - 1) && gameData[firstRow + 1][firstCol] >= 0) {
        pathArray.push(2);
        direct = 2;
        if (direct != 2) turnNum++;
        if (checkPath(firstRow + 1, firstCol, secondCol, secondRow)) return true;
        else {
            if (direct != 2) {
                turnNum--;
                direct = 2;
            }
        }
    }
    //往左
    if (firstCol != 0 && gameData[firstRow][firstCol - 1] >= 0) {
        pathArray.push(3);
        direct = 3;
        if (direct != 3) turnNum++;
        if (checkPath(firstRow, firstCol - 1, secondCol, secondRow)) return true;
        else {
            if (direct != 3) {
                turnNum--;
                direct = 3;
            }
        }
    }

    //往右
    if (firstCol < (960 / 60 - 1) && gameData[firstRow][firstCol + 1] >= 0) {
        pathArray.push(4);
        direct = 4;
        if (direct != 4) turnNum++;
        if (checkPath(firstRow, firstCol + 1, secondCol, secondRow)) return true;
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
    for (i = 0; i < 640 / 80 / 2; i++) {
        for (j = 0; j < 960 / 60; j++) {
            var data = random( - 4, 9);
            gameData[i][j] = data;
            dataPool[poolSize++] = data;
        }
    }
    poolSize--;
    dataPool.sort(randomsort);
    for (i = 640 / 80 / 2; i < 640 / 80; i++) for (j = 0; j < 960 / 60; j++) {
        gameData[i][j] = dataPool[poolSize--];
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

}