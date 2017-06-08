/**
 * Created by admin on 2017/6/2.
 */
$(document).ready(function(){
    var pageH,pageW;
    page= {
        init: function () {
            ////阻止body滑动
            $('body').on("touchmove", function (e) {
                e.preventDefault();
            });
            window.addEventListener("touchstart", function (e) {
                e.preventDefault();
            });
            $(window).resize(function () {
                page.resize();
            });
            page.a = ''
            page.c = document.getElementById("canvas");
            page.ctx = page.c.getContext("2d");
            page.click=0;
            //用来存储圆点
            page.circleArray=[];
            //用来存储线的首位位置；
            page.lineArray =[]
            //设置圆点数量
            page.circleLength =200;
            page.resize();
            page.canVas.init();
        },
        canVas:{
            init:function(){
                page.canVas._canvasCircle()
                $("body").on("click",function(){
                   // page.click=!page.click;
                })
                page.canVas._canvasLine();
            },
            _canvasCircle:function(){
                stage = new createjs.Stage("canvas");
                //循环定义圆点的属性；
                for(var i= 0;i< page.circleLength;i++){
                    //随机圆点颜色
                    var color = "rgba(255,255,255,"+(Math.random()+0.5)+")";
                    //随机半径
                    var radius = Math.random()+0.5;
                    //随机初始位置
                    var x = Math.random()*pageW;
                    var y = Math.random()*pageH;
                    //随机每个点的“移动速度跟方向”
                    var movex = (1-Math.random()*2)*0.5;
                    var movey = (1-Math.random()*2)*0.5;
                    //画点
                    var particle = page.canVas._drawCircle(color, radius,x,y,movex,movey);

                    //将点存入数组，用于后面调用
                    page.circleArray.push(particle);
                    //添加形状实例到舞台显示列表
                    stage.addChild(particle);
                }
                //帧率
                createjs.Ticker.setFPS(60);
                //更新阶段将呈现下一帧
                createjs.Ticker.addEventListener("tick", page.canVas.tick);

            },
            //圆点函数
            _drawCircle:function(color, radius,x,y,movex,movey){
                var particle = new createjs.Shape();
                particle.graphics.beginFill(color).drawCircle(0, 0, radius);
                particle.x = x;
                particle.y = y;
                particle.movex = movex;
                particle.movey = movey;
                return particle;

            },
            //画线；
            _canvasLine:function(){
                for(var a = 0;a< page.circleLength;a++){
                    for(var b=a+1;b<page.circleLength;b++ ){
                        page.a = page.canVas._drawLine(page.circleArray[a].x, page.circleArray[a].y, page.circleArray[b].x, page.circleArray[b].y);
                        page.lineArray.push(page.a)
                        stage.addChild(page.a);
                    }
                }
            },
            //画线函数；
            _drawLine:function(x1,y1,x2,y2,alpha){
                var line = new createjs.Shape();
                line.graphics.setStrokeStyle(0.5);
                line.graphics.beginStroke("rgba(255,255,255,1)");
                line.graphics.moveTo(x1,y1)
                line.graphics.lineTo(x2,y2);
                return line;
            },
            //圆点移动
            tick:function(){
                var j = 0;
                for(var i = 0;i< page.circleLength;i++){
                    //x轴方向，不同方向，不同速度移动
                    page.circleArray[i].x+=page.circleArray[i].movex;
                    //边缘反弹
                    if(page.circleArray[i].x>=pageW||page.circleArray[i].x<=0){
                        page.circleArray[i].movex=-page.circleArray[i].movex
                    }
                    //Y轴方向，不同方向，不同速度移动
                    page.circleArray[i].y+=page.circleArray[i].movey;
                    //边缘反弹
                    if(page.circleArray[i].y>=pageH||page.circleArray[i].y<=0){
                        page.circleArray[i].movey=-page.circleArray[i].movey
                    }
                };
                for(var a=0;a<page.circleLength;a++ ){
                    for(var b=a+1;b<page.circleLength;b++){
                        var x1 = page.lineArray[j].graphics._activeInstructions[0].x;
                        var y1 = page.lineArray[j].graphics._activeInstructions[0].y;
                        var x2 = page.lineArray[j].graphics._activeInstructions[1].x;
                        var y2 = page.lineArray[j].graphics._activeInstructions[1].y;
                        var lineLength = Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
                        //线条长度大于100的隐藏
                        if(lineLength>100){
                            page.lineArray[j].alpha=0;
                        }else{
                            page.lineArray[j].alpha=1-(lineLength/100);
                        }
                        //重置线条的起始点位置
                        page.lineArray[j].graphics._activeInstructions[0].x = page.circleArray[a].x;
                        page.lineArray[j].graphics._activeInstructions[0].y = page.circleArray[a].y;
                        page.lineArray[j].graphics._activeInstructions[1].x = page.circleArray[b].x;
                        page.lineArray[j].graphics._activeInstructions[1].y = page.circleArray[b].y;
                        j++
                    }
                }
                //刷新
                stage.update();
            }

        },
        resize: function () {
            pageH = $(window).height();
            pageW = $(window).width();
            $(".page").width(pageW).height(pageH);
            $('canvas').attr('width', pageW).attr('height', pageH)
        }
    };
    page.init();
});