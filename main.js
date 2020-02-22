//variable-----------------------------
var canvas = document.getElementById('mugu')
var ctx = canvas.getContext('2d');
var pencolor = document.getElementsByTagName('li')
var pen = 'white'
var state = false
var lastpoint = {
    'x': undefined,
    'y': undefined
}



//设置颜色
choseColor()

//设置画布大小
setCanvasSize()
window.onresize = function () {
    this.setCanvasSize()
}

//设置拾色器插件
Colorpicker.create({
    bindClass: 'picker',
    change: function (elem, hex) {
        elem.style.backgroundColor = hex
        elem.id =hex
        pen = hex 
    }
    
})








//function----------------------------------------------------------------


//色卡选择
function choseColor(){
    for(index = 0;index <3 ;index++){
        pencolor[index].onclick = function (xxx) {
            pen = xxx.toElement.id
        }
    }
}


function setCanvasSize() {
    var pagewidth = document.documentElement.clientWidth
    var pageheight = document.documentElement.clientHeight//获取页面宽高
    canvas.width = pagewidth
    canvas.height = pageheight
}

function drawLine(canvas, linewidth) {
    var x = canvas.clientX
    var y = canvas.clientY
    var newpoint = { 'x': x, 'y': y }
    ctx.strokeStyle = pen
    ctx.beginPath()
    ctx.lineWidth = linewidth
    ctx.moveTo(lastpoint.x, lastpoint.y)
    ctx.lineTo(newpoint.x, newpoint.y)
    ctx.stroke()
    ctx.closePath()
    lastpoint = newpoint
}

//f 画圈
function drawCricle(pendown, radius) {
    var x = pendown.clientX
    var y = pendown.clientY
    ctx.beginPath()
    ctx.fillStyle = pen
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
}
//按下去
canvas.onmousedown = function (pendown) {
    state = true
    drawLine(pendown, 7)//补充间隙
    drawCricle(pendown, 3)//粉笔开始效果
}
//移动鼠标

canvas.onmousemove = function (penmove) {
    if (state) {
        drawLine(penmove, 7)
    } else {

    }
}


//松开鼠标

canvas.onmouseup = function (penup) {
    drawLine(penup, 7)
    drawCricle(penup, 3)
    state = false
    lastpoint = {
        'x': undefined,
        'y': undefined
    }
}
