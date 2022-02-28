//variable-----------------------------
var canvas = document.getElementById('mugu')
var ctx = canvas.getContext('2d');
var pen = document.getElementsByTagName('li')
var penable = false
var pencolor = 'white'
var lastpoint = {
    'x': undefined,
    'y': undefined
}

//设置移动端屏幕防晃动
// document.body.ontouchstart = function( e){
//     e.preventDefault()
// }

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


//获取对象
let eraser = document.getElementById('eraser');
let drawpen = document.getElementById('drawpen');
let clearkit = document.getElementById('clearkit');
let saveImg = document.getElementById('saveImg');

//工具切换 状态
var eraserable = false
eraser.onclick = function () {
    eraserable = true
    console.log("object");
    eraser.classList.add('ative')
    drawpen.classList.remove('ative')
}
drawpen.onclick = function () {
    eraserable = false
    drawpen.classList.add('ative')
    eraser.classList.remove('ative')
}
clearkit.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}
saveImg.onclick = function () {
    var url = canvas.toDataURL('image/png')
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '宁吃了吗'
    a.target = '_blank'
    a.click()
    console.log(a);
}



//function----------------------------------------------------------------

//圆形橡皮檫
function onEraser(canvas, erasersize) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(canvas.clientX, canvas.clientY, erasersize, 0, Math.PI*2, false);
    ctx.fill();
    ctx.closePath();    
}

//色卡选择
function choseColor(pen) {
    for (index = 0; index < 3; index++) {
        pen[index].onclick = function (xxx) {
            drawpen.classList.add('ative')
            eraser.classList.remove('ative')
            eraserable = false
            pencolor = xxx.target.id
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
    ctx.globalCompositeOperation = "source-over"
    var x = canvas.clientX  //clientX/Y获取到的是触发点相对浏览器可视区域左上角距离，不随页面滚动而改变
    var y = canvas.clientY
    var newpoint = { 'x': x, 'y': y }
    ctx.strokeStyle = pencolor
    ctx.beginPath()
    ctx.lineWidth = linewidth
    ctx.moveTo(lastpoint.x, lastpoint.y)    //从旧点.
    ctx.lineTo(newpoint.x, newpoint.y)      //画到新点.
    ctx.stroke()
    ctx.closePath()
    lastpoint = newpoint    //全局变量中的lastpoint在移动画笔时还要用. 所以要记录位置
}


//画圈
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
                // ctx.clearRect(x - 7.5, y - 7.5, 50, 50)
                onEraser(pendown,10)
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
                onEraser(penmove,10)
            } else {
                drawLine(penmove, 7)
            }
        }
        //松开鼠标
        canvas.onmouseup = function (penup) {
            if (!eraserable) {
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