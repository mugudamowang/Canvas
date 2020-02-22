var canvas = document.getElementById('mugu')
var ctx = canvas.getContext('2d');
var state = false
var lastpoint = {
    'x': undefined,
    'y': undefined
}
var pagewidth = document.documentElement.clientWidth
var pageheight = document.documentElement.clientHeight//获取页面宽高
canvas.width = pagewidth
canvas.height = pageheight

window.onresize = function (){
    
    var pagewidth = document.documentElement.clientWidth
    var pageheight = document.documentElement.clientHeight//获取页面宽高
    
    canvas.width = pagewidth
    canvas.height = pageheight
}

function drawLine(canvas,linewidth){

    var x = canvas.clientX
    var y = canvas.clientY
    var newpoint = {'x':x, 'y':y}
    ctx.strokeStyle = '#fdfdfd'
    ctx.beginPath()
    ctx.lineWidth = linewidth 
    ctx.moveTo(lastpoint.x,lastpoint.y)
    ctx.lineTo(newpoint.x,newpoint.y)
    ctx.stroke()
    ctx.closePath()
    lastpoint = newpoint
}

//f 画圈
function drawCricle(pendown,radius) {
    var x = pendown.clientX
    var y = pendown.clientY
    ctx.beginPath()
    ctx.fillStyle = '#fdfdfd'
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
}
//按下去
canvas.onmousedown = function (pendown) {
    state = true
    drawLine(pendown,7)//补充间隙
    drawCricle(pendown,3)//粉笔开始效果
}
//移动鼠标

canvas.onmousemove = function (penmove) {
    if (state) {
        drawLine(penmove,7)
    }else{

    }
}


//松开鼠标

canvas.onmouseup = function (penup) {
    drawLine(penup,7)
    drawCricle(penup,3)
    state = false
    lastpoint = {
        'x': undefined,
        'y': undefined
    }
}