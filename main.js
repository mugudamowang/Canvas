//variable-----------------------------
var canvas = document.getElementById('mugu')
var ctx = canvas.getContext('2d');
var pen = document.getElementsByTagName('li')
var pencolor = 'white'
var penable = false
var lastpoint = {
    'x': undefined,
    'y': undefined
}



//设置颜色 操作
choseColor(pen)

//设置画布大小 操作
setCanvasSize(canvas)
window.onresize = function () {
    this.setCanvasSize(canvas)
}

//设置拾色器 插件
Colorpicker.create({
    bindClass: 'picker',
    change: function (elem, hex) {
        elem.style.backgroundColor = hex
        elem.id = hex
        pencolor = hex
    }

})

//监听鼠标 操作
listenTomouse(canvas)

//工具切换 状态
var eraserable = false
eraser.onclick = function () {
    eraserable = true
    eraser.classList.add('ative')
    drawpen.classList.remove('ative')
}
drawpen.onclick = function () {
    eraserable = false
    drawpen.classList.add('ative')
    eraser.classList.remove('ative')
}
clearkit.onclick = function (){
    ctx.clearRect(0,0,canvas.width,canvas.height)
}
saveimg.onclick = function (){
    var url = canvas.toDataURL('image/png')
    var a  = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '宁吃了吗'
    a.target = '_blank'
    a.click()


}



//function----------------------------------------------------------------

//圆形橡皮檫

//色卡选择
function choseColor(pen) {
    for (index = 0; index < 3; index++) {
        pen[index].onclick = function (xxx) {
            drawpen.classList.add('ative')
            eraser.classList.remove('ative')
            eraserable = false
            pencolor = xxx.toElement.id
        }
    }
}

//尺寸设置函数
function setCanvasSize(canvas) {
    var pagewidth = document.documentElement.clientWidth
    var pageheight = document.documentElement.clientHeight//获取页面宽高
    canvas.width = pagewidth
    canvas.height = pageheight
}

//画线函数
function drawLine(canvas, linewidth) {
    var x = canvas.clientX
    var y = canvas.clientY
    var newpoint = { 'x': x, 'y': y }
    ctx.strokeStyle = pencolor
    ctx.beginPath()
    ctx.lineWidth = linewidth
    ctx.moveTo(lastpoint.x, lastpoint.y)
    ctx.lineTo(newpoint.x, newpoint.y)
    ctx.stroke()
    ctx.closePath()
    lastpoint = newpoint
}

//画圈f
function drawCricle(pendown, radius) {
    var x = pendown.clientX
    var y = pendown.clientY
    ctx.beginPath()
    ctx.fillStyle = pencolor
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
}





//监听事件
function listenTomouse(canvas) {
    if (document.body.ontouchstart !== undefined) {
        canvas.ontouchstart = function (touchstart) {
            var x = touchstart.touches[0].clientX
            var y = touchstart.touches[0].clientY
            penable = true

            if (eraserable) {
                ctx.clearRect(x - 7.5, y - 7.5, 15, 15)
            } else {

                drawLine(touchstart.touches[0], 7)//补充间隙
                drawCricle(touchstart.touches[0], 3)//粉笔开始效果
            }

        }

        //移动鼠标
        canvas.ontouchmove = function (touchmove) {
            var x = touchmove.touches[0].clientX
            var y = touchmove.touches[0].clientY

            if (!penable) { return }

            if (eraserable) {
                ctx.clearRect(x - 7.5, y - 7.5, 20, 20)
            } else {
                drawLine(touchmove.touches[0], 7)
            }
        }
        //松开手指
        canvas.ontouchend = function (touched) {
            if (!penable) {
                console.log('hello')
                drawLine(touched.touches[0], 7)
                drawCricle(touched.touches[0], 3)
            }
            penable = false
            lastpoint = {
                'x': undefined,
                'y': undefined
            }
        }
} else {
    //按下去
    canvas.onmousedown = function (pendown) {
        var x = pendown.clientX
        var y = pendown.clientY
        penable = true


        if (eraserable) {
            ctx.clearRect(x - 7.5, y - 7.5, 15, 15)
        } else {

            drawLine(pendown, 7)//补充间隙
            drawCricle(pendown, 3)//粉笔开始效果
        }

    }

    //移动鼠标
    canvas.onmousemove = function (penmove) {
        var x = penmove.clientX
        var y = penmove.clientY

        if (!penable) { return }

        if (eraserable) {
            ctx.clearRect(x - 7.5, y - 7.5, 20, 20)
        } else {
            drawLine(penmove, 7)
        }
    }
    //松开鼠标
    canvas.onmouseup = function (penup) {
        if (!penable) {
            drawLine(penup, 7)
            drawCricle(penup, 3)
        }
        penable = false
        lastpoint = {
            'x': undefined,
            'y': undefined
        }
    }
}
}