function drawPath(startCol,startRow)
{
for(var i=0;i<pathArray.length-1;i++)
{
var step=pathArray[i];
if(step==1)
{
startRow=startRow-1;
drawPathCell(startCol,startRow,1);
}
else 
if(step==2)
{
startRow=startRow+1;
drawPathCell(startCol,startRow,1);
}

else if(step==3)
{
startCol=startCol-1;
drawPathCell(startCol,startRow,2);
}
else if(step==4)
{
startCol=startCol+1;
drawPathCell(startCol,startRow,2);
}
}
}


//画路线，2是水平，1是竖直
function drawPathCell(col,row,pathDirect)
{
var x=col*60;
var y=row*80;
var width=60;
var height=80;
ctx.beginPath();
ctx.lineWidth="5";
ctx.strokeStyle="red"; // 红色路径
if(pathDirect==1)
{
ctx.moveTo(x+width/2,y);
ctx.lineTo(x+width/2,y+height);
}
else
{
ctx.moveTo(x,y+height/2);
ctx.lineTo(x+width,y+height/2);

}
ctx.stroke(); // 进行绘制
}