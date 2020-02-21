var canvas = document.getElementById('mugu')
var ctx = canvas.getContext('2d');
var state = false
var lastpoint = {
    'x': undefined,
    'y': undefined
}

function drawLine(canvas){

    var x = canvas.clientX
    var y = canvas.clientY
    var newpoint = {'x':x, 'y':y}
    ctx.strokeStyle = 'white'
    ctx.beginPath()
    ctx.moveTo(lastpoint.x,lastpoint.y)
    ctx.lineTo(newpoint.x,newpoint.y)
    ctx.stroke()
    ctx.closePath()
    lastpoint = newpoint
}

//f 画圈
function drawCricle(radius) {
    var x = canvas.clientX
    var y = canvas.clientY
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
}
//按下去
canvas.onmousedown = function (canvas) {
    state = true
    drawCricle(1)
}

//移动鼠标

canvas.onmousemove = function (canvas) {
    if (state) {
        drawLine(canvas)
    }else{

    }
}


//松开鼠标

canvas.onmouseup = function (canvas) {
    state = false
    lastpoint = {
        'x': undefined,
        'y': undefined
    }
}