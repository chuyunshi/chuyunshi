/**
 * Created by admin on 2017/6/2.
 */
$(document).ready(function(){
    var pageH,pageW;
    page= {
        init: function () {
            ////��ֹbody����
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
            //�����洢Բ��
            page.circleArray=[];
            //�����洢�ߵ���λλ�ã�
            page.lineArray =[]
            //����Բ������
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
                //ѭ������Բ������ԣ�
                for(var i= 0;i< page.circleLength;i++){
                    //���Բ����ɫ
                    var color = "rgba(255,255,255,"+(Math.random()+0.5)+")";
                    //����뾶
                    var radius = Math.random()+0.5;
                    //�����ʼλ��
                    var x = Math.random()*pageW;
                    var y = Math.random()*pageH;
                    //���ÿ����ġ��ƶ��ٶȸ�����
                    var movex = (1-Math.random()*2)*0.5;
                    var movey = (1-Math.random()*2)*0.5;
                    //����
                    var particle = page.canVas._drawCircle(color, radius,x,y,movex,movey);

                    //����������飬���ں������
                    page.circleArray.push(particle);
                    //�����״ʵ������̨��ʾ�б�
                    stage.addChild(particle);
                }
                //֡��
                createjs.Ticker.setFPS(60);
                //���½׶ν�������һ֡
                createjs.Ticker.addEventListener("tick", page.canVas.tick);

            },
            //Բ�㺯��
            _drawCircle:function(color, radius,x,y,movex,movey){
                var particle = new createjs.Shape();
                particle.graphics.beginFill(color).drawCircle(0, 0, radius);
                particle.x = x;
                particle.y = y;
                particle.movex = movex;
                particle.movey = movey;
                return particle;

            },
            //���ߣ�
            _canvasLine:function(){
                for(var a = 0;a< page.circleLength;a++){
                    for(var b=a+1;b<page.circleLength;b++ ){
                        page.a = page.canVas._drawLine(page.circleArray[a].x, page.circleArray[a].y, page.circleArray[b].x, page.circleArray[b].y);
                        page.lineArray.push(page.a)
                        stage.addChild(page.a);
                    }
                }
            },
            //���ߺ�����
            _drawLine:function(x1,y1,x2,y2,alpha){
                var line = new createjs.Shape();
                line.graphics.setStrokeStyle(0.5);
                line.graphics.beginStroke("rgba(255,255,255,1)");
                line.graphics.moveTo(x1,y1)
                line.graphics.lineTo(x2,y2);
                return line;
            },
            //Բ���ƶ�
            tick:function(){
                var j = 0;
                for(var i = 0;i< page.circleLength;i++){
                    //x�᷽�򣬲�ͬ���򣬲�ͬ�ٶ��ƶ�
                    page.circleArray[i].x+=page.circleArray[i].movex;
                    //��Ե����
                    if(page.circleArray[i].x>=pageW||page.circleArray[i].x<=0){
                        page.circleArray[i].movex=-page.circleArray[i].movex
                    }
                    //Y�᷽�򣬲�ͬ���򣬲�ͬ�ٶ��ƶ�
                    page.circleArray[i].y+=page.circleArray[i].movey;
                    //��Ե����
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
                        //�������ȴ���100������
                        if(lineLength>100){
                            page.lineArray[j].alpha=0;
                        }else{
                            page.lineArray[j].alpha=1-(lineLength/100);
                        }
                        //������������ʼ��λ��
                        page.lineArray[j].graphics._activeInstructions[0].x = page.circleArray[a].x;
                        page.lineArray[j].graphics._activeInstructions[0].y = page.circleArray[a].y;
                        page.lineArray[j].graphics._activeInstructions[1].x = page.circleArray[b].x;
                        page.lineArray[j].graphics._activeInstructions[1].y = page.circleArray[b].y;
                        j++
                    }
                }
                //ˢ��
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