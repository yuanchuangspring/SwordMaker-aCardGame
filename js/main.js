$(function (){
    changePage(0);
    init();
});

sw=window.screen.width;
sh=window.screen.height;
pages=[0];
var turnnum=1;
var path="";
var blood=200;
var bloodnow=200;
var bat=10;
var batnow=10;
var nowCards="";
var cardnum=0;
var cardcol=0;
var idd=0;
var qipos="";
var guan=true;
var nowatt=0;

var prew=-1;
var preh=-1;

nowmy=new Array();
pagebox=new Array();
nowoppo=new Array(15).fill("");
zhezhaolist=new Array(15).fill("");
oppoku=new Array();
pagebox[0]="<div id='main'><div id='title'>剑匠</div><div id='version'>DEMO版本</div><div id='startButton'>开始游戏</div></div>";
pagebox[1]="<div id='main'><div id='mycard'></div></div>";
pagebox[2]="<div id='main'><div id='chooseTitle'>请选择您要挑战的卡包</div></div>";
pagebox[3]="<div id='main'><div id='chooseTitle'>请选择您的初始卡牌</div></div>";
var jsondataob
var x0="";
var y0="";
var peratt=1;

var effectcard=[];
var mych=[];
var qiqi=false;
var qifunc="";
turnAB=[];

function coppoc(isForward){
    if(oppoku.length>0){
    ran=Random(0,oppoku.length-1);
     pai=oppoku[ran];
     oppoku.splice(ran,1);
     w=[0,1,2];
     posxx=Random(0,2);
     if(isForward==false){
     if(nowoppo[posxx]!=""){
       w.splice(posxx,1);
       posxx=Random(0,1);
       if(nowoppo[posxx]!=""){
         w.splice(posxx,1);
         posxx=w[0];
       }
     }
     }
     if(nowoppo[posxx]==""){
     nowoppo[posxx]=[idd,pai];
     $("#main").append("<div class='oppocard' id='oppo"+idd+"'></div>");
     $("#oppo"+idd).css("top",35);
     $("#oppo"+idd).css("left",70+posxx*85);
     $("#oppo"+idd).append("<p class='cardname' id='cn"+idd+"'>"+pai.name+"</p>");
     $("#oppo"+idd).append("<img class='cardheart' src='svg/cardheart.svg' type='image/svg+xml' />");
     $("#oppo"+idd).append("<p class='cardhearttext'>"+pai.heart+"</p>");
     if(pai.itstype!="building"){
     $("#oppo"+idd).append("<img class='cardatt' src='svg/sword-line.svg' type='image/svg+xml' />");
     $("#oppo"+idd).append("<p class='cardatttext'>"+pai.att+"</p>");
     
     $("#oppo"+idd).append("<img class='carddis' src='svg/ruler-line.svg' type='image/svg+xml' />");
     $("#oppo"+idd).append("<p class='carddistext'>"+pai.attdis+"</p>");
     }
     
     if(pai.shop==true){
       
       $("#oppo"+idd).on("click",function(){
          
           iidd=this.getAttribute("id").substr(4,this.getAttribute("id").length);
          
           uuiidd=0;
           
           for(i=0;i<nowoppo.length;i++){if(nowoppo[i][0]==iidd){
               uuiidd=i;
              
               break;
           }}
           
           pai=nowoppo[uuiidd][1];
           if(uuiidd>=6){
            
           $("body").append("<div id='pausebroadingdiv'></div>");
           $("#pausebroadingdiv").append("<div id='shopname'>"+pai.name+"</div>");
           for(i=0;i<3;i++){
             rran=Random(0,pai.shoplist.length-1);
             $("#pausebroadingdiv").append("<br/><div class='shopcard' id='shop"+rran+""+i+"'><b>"+pai.shoplist[rran].name+"</b><br/>"+pai.shoplist[rran].des+"<br/><p style='color:#46a2ff;'>消耗能量:"+pai.shoplist[rran].consume+"</p><br/><br/><p style='color:#df9b00;'>花费金币:"+pai.shoplist[rran].cost+"</p></div>");
           
           
           }
           $("#pausebroadingdiv").append("<div id='shopback'>返回</div>");
           document.getElementById("shopback").addEventListener("click", function(){
               $("#pausebroadingdiv").remove();
               });
           
           }else{$("#main").append("<div class='tiptext'>只能进入距离小于等于三的商店</div>");setTimeout("$('.tiptext').remove()",800);}
  
           });
         
     }
     idd+=1;
     }
   }
}

function chooseGiveup(cnum,func){
     $("#main").append("<div class='tiptext'>点击想要弃的牌</div>");
     qiqi=true;
     qifunc=func;
      
}

function jianshang(per,huihe){
    
    turnAB.push(["peratt="+(1-per)+";",huihe]);
}

function attit(attnum,addlist){
   for(i=0;i<effectcard.length;i++){
     iiid=nowoppo[effectcard[i]][0];
    
     aim=$("#oppo"+iiid).find(".cardhearttext");
     
     $("#oppo"+iiid).append("<p class='attnum'>-"+attnum+"</p>");
     $("#oppo"+iiid).animate({left:"-=10px"},50);
     $(".attnum").animate({top:"-=10px",opacity:"0"},500,function (){$(".attnum").remove();});
     $("#oppo"+iiid).animate({left:"+=20px"},50);
     $("#oppo"+iiid).animate({left:"-=10px"},50);
     if(parseInt(aim.text())-attnum<=0){
       
       nowoppo[effectcard[i]]="";
       
       $("#oppo"+iiid).remove();
       
     }
     else{
     aim.text(parseInt(aim.text())-attnum);
     }
   }
}

function cure(cnum){
    $("body").css("background-color","#85ff78");
    setTimeout("$('body').css('background-color','#4a4035')",200);
    if(bloodnow+cnum<=blood){
    bloodnow=parseInt(bloodnow)+cnum;
    $("#blood").text(bloodnow+"/"+blood);
    }else{
        bloodnow=blood;
        $("#blood").text(bloodnow+"/"+blood);
    }
}

function addEnergy(anum){
    $("body").css("background-color","#459cff");
    setTimeout("$('body').css('background-color','#4a4035')",200);
    batnow=parseInt(batnow)+anum;
    $("#bat").text(batnow);
}

function hurt(hnum=-1){
    if(hnum==-1){
    $("body").css("background-color","#f5391c");
    setTimeout("$('body').css('background-color','#4a4035')",300);
    bloodnow=parseInt(bloodnow)-Math.floor((parseInt(nowatt)*peratt));
    $("#blood").text(bloodnow+"/"+blood);
    }else{
    $("body").css("background-color","#f5391c");
    setTimeout("$('body').css('background-color','#4a4035')",300);
    bloodnow=parseInt(bloodnow)-Math.floor((hnum*peratt));
    $("#blood").text(bloodnow+"/"+blood);
    
    }
    
}

function readIt(which){
     
     $.ajax({url:which,async: false,success:function(result){
        jsondataob=result;
    }});
      
}



function endTurn(isQ){
    
    
    
    
    
    if(nowmy.length>6&&isQ==false){
        $("#endbutton").animate({opacity:"0"},500);
        $("#endbutton").animate({opacity:"1"},500);
        $("#main").append("<div class='tiptext'>当前手牌数超过最大手牌数6，请弃一些牌</div>");
        setTimeout("$('.tiptext').remove()",1000);
     }else if(nowmy.length>6&&isQ==true){
    
         while (nowmy.length>6){rann=Random(0,nowmy.length-1);$("#"+nowmy[rann][0]).remove();nowmy.splice(rann,1);}
           $("#main").append("<div class='tiptext'>当前手牌数超过最大手牌数6,已随机弃牌</div>");
        setTimeout("$('.tiptext').remove()",1000);
           for(j=0;j<nowmy.length;j++){
                      x=sw/(nowmy.length+1)*(j+1)-40 + "px";
                      names="#"+ nowmy[j][0];
                      $(names).animate({left:x});
                }
     }
     else{
       $("#endbutton").animate({opacity:"0"},500);
    game("null",guan,false);
    }
}

function chooseCards(name){
    nowCards=name.substr(0,name.length-5);
    changePage(1);
    game(name,guan,true);
}

function pauseit(){
    $("body").append("<div id='pausebroadingdiv'></div>");
    $("#pausebroadingdiv").append("<div class='pausetext' id'ptitle'>-暂停-</div>");
    $("#pausebroadingdiv").append("<div class='pausetext' id='pback'>继续</div>");
    $("#pausebroadingdiv").append("<div class='pausetext' id='phome'>主页面</div>");
    
    document.getElementById("phome").addEventListener("click", function(){
                 $("#pausebroadingdiv").remove();changePage(0);
            });
    document.getElementById("pback").addEventListener("click", function(){
                 $("#pausebroadingdiv").remove();
            });
}

function changePage(page){
    $('body').css("overflow-y","hidden");
    
    pages.push(page);
    for(i in pages){
        if(i>=2&&pages[i]==pages[i-1]){pages.splice(i,1);}
    }
    main=$("#main");
    main.each(function (i){this.remove();});
    switch(page){
        case 0:
           
           $("body").append(pagebox[0]);
           $("#main").append("<div id='cardbutton'>出战卡包</div>");
           
           init();
           break;
        case 1:
           $("body").append(pagebox[1]);
           for(i=0;i<5;i++){
                for(j=0;j<3;j++){
                    $("#main").append("<div class='yourcard' id='your-" + i + "-" + j + "'></div>");
                    the=$("#your-"+i+"-"+j);
                    the.css("left",70+85*j);
                    the.css("top",35+100*i);
                }
           }
           $("#main").append("<div id='levelname'>———"+nowCards+"———</div>");
           
           $("#main").append("<div id='jianfeng'></div>");
           $("#main").append("<div id='jianji'></div>");
           $("#main").append("<div id='jiancong1'></div>");
           $("#main").append("<div id='jiancong2'></div>");
           $("#main").append("<div id='jiange'></div>");
           $("#main").append("<div id='jianba'></div>");
           
           $("#jianfeng").css("left",sw-38.5+"px");
           $("#jianji").css("left",sw-27+"px");
           $("#jiancong1").css("left",sw-20+"px");
           $("#jiancong2").css("left",sw-38+"px");
           $("#jiange").css("left",sw-49+"px");
           $("#jianba").css("left",sw-30.5+"px");
           
           
           $("#main").append("<div id='endbutton'>结束本回合</div>");
           $("#main").append("<div id='turnTitle'></div>");
           
           $("#main").append("<img id='pause' src='svg/pause.svg' type='image/svg+xml' />")
           $("#pause").css("left",sw-55+"px");
           $("#main").append("<img id='heart' src='svg/heart.svg' type='image/svg+xml' />")
           $("#main").append("<img id='battery' src='svg/battery.svg' type='image/svg+xml' />")
           
           $("#main").append("<div id='giveupaera'>弃<br/>牌<br/>堆</div>");
           
           
           
           
           $("#main").append("<div id='blood'>"+bloodnow+"/"+blood+"</div>");  
           $("#main").append("<div id='bat'>"+batnow+"</div>");  
           
           document.getElementById("endbutton").addEventListener("click", function(){
                 endTurn(false);
            });
           document.getElementById("pause").addEventListener("click", function(){
                 pauseit();
            });
          
           
              
           break;
       case 2:
           $("body").append(pagebox[2]);
           $("#main").append("<img id='back' src='svg/back.svg' type='image/svg+xml' />")
           document.getElementById("back").addEventListener("click", function(e){
                changePage(pages[pages.length-2]);
                
                 
            });
           
           filelist=wc.getFileList("JianJiangGame/config/opposite-card/");
           
           filelist=filelist.concat(guanfangku);
           
           for(i=0;i<filelist.length;i++){
                fileit=filelist[i];
                if(fileit.from=="官方"){
                   dataob=fileit.obj;
                   
                   $("#main").append("<div class='chooseCards' id='"+fileit.name+"'>"+(i+1+".")+fileit.name.substr(0,fileit.name.length-5)+"<br/><p class='des'>卡包作者:"+dataob.author+"<br/>简介:"+dataob.description+"<br/>卡牌数量:"+dataob.num+"张<br/>难度值:"+dataob.dif+"<br/>卡包版本:"+dataob.version+"</p></div>");
                
                }
                else{
                data=wc.read("JianJiangGame/config/opposite-card/"+fileit.name);
                dataob=JSON.parse(data);
                
                
                $("#main").append("<div class='chooseCards' id='"+fileit.name+"'>"+(i+1+".")+fileit.name.substr(0,fileit.name.length-5)+"<br/><p class='des'>卡包作者:"+dataob.author+"<br/>简介:"+dataob.description+"<br/>卡牌数量:"+dataob.num+"张<br/>难度值:"+dataob.dif+"<br/>卡包版本:"+dataob.version+"</p></div>");
                }
                document.getElementById(fileit.name).addEventListener("click", function(e){
                 chooseCards(this.getAttribute("id"));
            });
           }
           
           break;
        case 3:
            $('body').css("overflow-y","visible");
            $("body").append(pagebox[3]);
            $("#main").append("<img id='back' src='svg/back.svg' type='image/svg+xml' />")
            document.getElementById("back").addEventListener("click", function(e){
                wc.alertDialog({
                 title: '提示',
                 content: '确定要保存牌组并退出吗',
                 ok: '确定',
                 okFun: function (){
                 wc.alert("保存成功!");
                 changePage(pages[pages.length-2]);      
                  }
      
                });
                
                 
            });
            obl=[];
            fl=wc.getFileList("JianJiangGame/config/my-card");
            for(i=0;i<fl.length;i++){obl=obl.concat(JSON.parse(wc.read("JianJiangGame/config/my-card"+fl[i])));}
            myku=myku.concat(obl);
            for(i=0;i<myku.length;i++){
              if(myku[i].getFromStart!=false){
              $("#main").append("<div class='mychoosew' id='mych"+i+"'>"+myku[i].name+"<br/>"+myku[i].des+"<br/>消耗:"+myku[i].consume+"</div>");
              $("#mych"+i).css("top",50+97*i);
              $("#main").append("<div class='mychb' id='mychb"+i+"'>选择该牌</div>");
              $("#mychb"+i).css("top",50+97*i);
              if(mych.indexOf(myku[i])!=-1){
                $("#mychb"+i).text("已选择");
                $("#mychb"+i).css("background-color","#9dffb3");
                
              }
              document.getElementById("mychb"+i).addEventListener("click", function(){
                       bid=this.getAttribute("id");
                       bb=bid.substr(5,bid.length-1);
                       if($("#"+bid).text()=="选择该牌"){
                       
                       if(mych.length<8){
                       $("#"+bid).text("已选择");
                       $("#"+bid).css("background-color","#9dffb3");
                       
                       mych.push(myku[bb]);
                       
                       
                       
                       
                       }else{wc.alertDialog({
                 title: '提示',
                 content: '选择卡牌数已超过上限8!其他卡牌可以由游戏中的商店获得',
                 ok: '确定',
                 okFun: function (){
                     
                  }
      
                });}
                       
                       }else{$("#"+bid).text("选择该牌");$("#"+bid).css("background-color","#f9f1db");while (mych.indexOf(myku[bb])!=-1){mych.splice(mych.indexOf(myku[bb]),1);}}
                  
             });
            }
        }    
    }
}


function forWard(step){
    //敌人前进
   for(s=0;s<step;s++){
     for(i=0;i<12;i++){
              if(nowoppo[11-i]!=""&&nowoppo[14-i]==""){
                  iddd=nowoppo[11-i][0];
                  ddd=nowoppo[11-i];
                  $("#oppo"+iddd).animate({top:"+=100px"});
                  nowoppo[11-i]="";
                  nowoppo[14-i]=ddd;
              }
              
      }
     
     //给敌人发牌
     coppoc(true);
     }
}

function backWard(step){
    for(s=0;s<step;s++){
      for(i=3;i<15;i++){
              if(nowoppo[i]!=""&&nowoppo[i-3]==""){
                  iddd=nowoppo[i][0];
                  ddd=nowoppo[i];
                  $("#oppo"+iddd).animate({top:"-=100px"});
                  nowoppo[i]="";
                  nowoppo[i-3]=ddd;
              }
      }
    }
}

function cFile(pathnamex){
    wc.write(pathnamex+"/create.json","create");
    wc.delFile(pathnamex+"/create.json");
    
    
}

function init(){
    if(!wc.isDir("JianJiangGame/config")){
      wc.alert("文件初始化...");
      cFile("JianJiangGame");
      cFile("JianJiangGame/config");
      cFile("JianJiangGame/config/my-card");
      cFile("JianJiangGame/config/opposite-card");
      
      
    }
    $('body').css("overflow-y","hidden");
    
    $('body').css("overflow-x","hidden");
    $("body").css("width",window.screen.width);
    //设置开始游戏按钮
    document.getElementById("startButton").addEventListener("click", function(){
        if(mych.length!=0){
        changePage(2);
        }else{
            wc.alertDialog({
                 title: '提示',
                 content: '您还没有选择任何卡牌！',
                 ok: '确定',
                 okFun: function (){
                     
                  }
      
                });
        }
        
    });
    document.getElementById("cardbutton").addEventListener("click", function(){
        changePage(3);
        
    });
    
}


function giveCard(num){
    for(i=0;i<num;i++){
        
        numm=Random(0,mych.length-1);
        mypai=mych[numm];
        
        cardnum+=1;
        nowmy.push([cardnum,mypai]);
        xx=sw/(nowmy.length+1)-40 + "px";
        x1=(sw/(nowmy.length+1))*nowmy.length-40 + "px";
        y=600+cardcol*50 + "px";
        $("#mycard").append("<div class='newcard' id='" + cardnum + "'>"+mypai.name+"<br/>"+mypai.des+"</div>");
        $("#" + cardnum).append("<p class='cardbattext'>"+mypai.consume+"</p>");
        $("#" + cardnum).append("<img class='cardbat' src='svg/battery-charging.svg' type='image/svg+xml' />");
        
  
     
        $("#" + cardnum).animate({left:x1,top:y},500);
        
        
        if(nowmy.length!=1){
            for(j=0;j<nowmy.length;j++){
                x=sw/(nowmy.length+1)*(j+1)-40 + "px";
                names="#"+ nowmy[j][0];
                
                $(names).animate({left:x},300);
            }
        }
        document.getElementById(cardnum).addEventListener("touchstart", function(e){
           iid=this.getAttribute("id");
           if(qiqi==true){
           $("#"+iid).remove();
           for(i=0;i<nowmy.length;i++){
           if(nowmy[i][0]==iid){
           uuid=i;
           break;
           }
            
           }
           nowmy.splice(i,1);
           eval(qifunc);
           qiqi=false;
           qifunc="";
           $(".tiptext").remove();
           for(j=0;j<nowmy.length;j++){
                      x=sw/(nowmy.length+1)*(j+1)-40 + "px";
                      names="#"+ nowmy[j][0];
                      $(names).animate({left:x});
                }
              
           }else{
           
           y0=$("#"+iid).position().top+"px";
           
           x0=$("#"+iid).position().left+"px";
           $("#"+iid).animate({width:"100px",left:"-=10px",height:"118.75px",top:"-=11.875px"});
          }
        });
        document.getElementById(cardnum).addEventListener("touchmove", function(e){
            iid=this.getAttribute("id");
           for(i=0;i<nowmy.length;i++){
                    if(nowmy[i][0]==iid){
                         mp=nowmy[i][1];
                         uuid=i;
                     
                    }
           }
            ex=e.touches[0].pageX;
            ey=e.touches[0].pageY;
            x = e.touches[0].pageX-50+"px";
            y = e.touches[0].pageY-54.375+"px";
           
           $("#"+iid).css("left",x);
           $("#"+iid).css("top",y);
           
           if(ex>70&&ex<320&&ey>35&&ey<530){
               w=Math.floor((ex-70)/83);
               h=Math.floor((ey-35)/99);
               if(!(h==preh&&w==prew)){$(".effectzhao").remove();}
               itid=nowoppo[h*3+w][0];
               //itid是元素id
               //hw表达式是nowoppo索引
               //uuid是玩家手牌索引
               if($('#eff'+itid).length==0&&nowoppo[h*3+w]!=""){
                 
                 if(nowmy[uuid][1].itstype=="dis-att"&&5-h<=nowmy[uuid][1].maxattdis){
                   
                   $("#oppo"+itid).append("<div class='effectzhao' id='eff"+itid+"'></div>");
                   if(effectcard.indexOf(h*3+w)==-1){
                   effectcard.push(h*3+w);
                  }
                   if(nowmy[uuid][1].jianjiang==true&&qipos==nowmy[uuid][1].jianpan){
                        rangelist=nowmy[uuid][1].jianrange;
                     }else{rangelist=nowmy[uuid][1].range;}
                   for(i=1;i<rangelist.length;i++){
                    
                       if((h*3+w)+rangelist[i]>=0&&(h*3+w)+rangelist[i]<=14&&nowoppo[(h*3+w)+rangelist[i]]!=""){
                         wid=nowoppo[(h*3+w)+rangelist[i]][0];
                         
                         if(!$("#eff"+ wid).length!=""){
                           
                         $("#oppo"+wid).append("<div class='effectzhao' id='eff"+wid+"'></div>");
                         if(effectcard.indexOf((h*3+w)+rangelist[i])==-1){
                          effectcard.push((h*3+w)+rangelist[i]);
                          }
                          }
                       }
                     }
                   }
                   else if(nowmy[uuid][1].itstype=="dis-att"){
                    
                    $("#oppo"+itid).append("<div class='effectzhao' id='eff"+itid+"'></div>");
                    $("#eff"+itid).css("background-color","#ff908a");
                    effectcard=[];
               }
             }
           }
           else{
               $(".effectzhao").remove();
               effectcard=[];
               preh=-1;
               prew=-1;
           }
           
           if(ex<60&&ey>400&&ey<500){
              $("#giveupaera").animate({width:"50px"},10);
               $("#giveupaera").css("background-color","#ff6059");
            }
            else{
              $("#giveupaera").animate({width:"30px"},10);
               $("#giveupaera").css("background-color","#f9f1db");
            }
            
        });
        document.getElementById(cardnum).addEventListener("touchend", function(e){
           $(".effectzhao").remove();
           iid=this.getAttribute("id");
           for(i=0;i<nowmy.length;i++){
                    if(nowmy[i][0]==iid){
                         mp=nowmy[i][1];
                         uuid=i;
                     
                    }
           }
             $("#giveupaera").animate({width:"30px"},10);
             $("#giveupaera").css("background-color","#f9f1db");
             
              
           if(ex<60&&ey>400&&ey<500){
             fadeiid=iid;
             fadeuuid=uuid;
              $("#"+fadeiid).fadeTo(500,0,function (){$("#"+fadeiid).remove();});
                nowmy.splice(fadeuuid,1);
              for(j=0;j<nowmy.length;j++){
                      x=sw/(nowmy.length+1)*(j+1)-40 + "px";
                      names="#"+ nowmy[j][0];
                      $(names).animate({left:x});
                }
              if(nowmy.length<=6){$(".tiptext").remove();}
           }
           else{
           if($("#"+iid).position().top>=500||mp.consume>batnow||(nowmy[uuid][1].itstype=="dis-att"&&effectcard.length==0)){
           
           $("#"+iid).animate({width:"80px",left:x0,height:"95px",top:y0});
         
           getBack(iid,x0,y0);
           }else{
               nowmy.splice(uuid,1);
               
               $(".effectzhao").remove();
               batnow-=mp.consume;
               $("#bat").text(batnow);
               eval(mp.func);
               
               fadeiid=iid;
               $("#"+fadeiid).fadeTo(500,0,function (){$("#"+fadeiid).remove();});
               for(j=0;j<nowmy.length;j++){
                      
                      x=sw/(nowmy.length+1)*(j+1)-40 + "px";
                      names="#"+ nowmy[j][0];
                      $(names).animate({left:x});
                }
                     
                    
               
               
               
           }
           
         }
        });
        
    }
}

function gameinit(){
    document.getElementById("startButton").addEventListener("click", function(){
        changePage(1);
        
    });
}

function Random(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function transQi(pos){
     $("#jian"+qipos).animate({opacity:"0.2"});
     qipos=pos;
     $("#jian"+qipos).animate({opacity:"1"});
}

function game(cards,isGuan,isNEW){
     if(isNEW==true){
     nowmy=[];
     turnnum=0;
     qipos="ba";
     
     oppoku=[];
     nowoppo= new Array(15).fill("");
     idd=0;
     
     if(isGuan==true){
     yourku=dataob.cards;
     }
     else{
       //自制卡牌接口
        data=wc.read("JianJiangGame/config/opposite-card/"+cards);
        dataob=JSON.parse(data);
        yourku=dataob;
     
     }
   
     for(i=0;i<yourku.length;i++){
          num=yourku[i].num;
          for(j=0;j<num;j++){oppoku.push(yourku[i]);}
     }
     
     }
     
     //if判断结束...↑
     
     
     
     //每回合执行程序↓
     
     $("#endbutton").animate({opacity:"1"},500);
     
     peratt=1;
     for(i=0;i<turnAB.length;i++){
       eval(turnAB[i][0]);
       if(turnAB[i][1]==1){turnAB.splice(i,1);}else{turnAB[i][1]=turnAB[i][1]-1}
     }
     turnnum+=1;
     $("#main").append("<div id='turnTitle'></div>");
     $("#turnTitle").text("第"+turnnum+"回合");
     $("#turnTitle").animate({opacity:"1"},1000);
     $("#turnTitle").animate({opacity:"0"},1000);
     setTimeout("$('#turnTitle').remove()",2000);
     //给玩家发牌
     giveCard(2);
     if(turnnum!=1){batnow+=5;}
     $("#bat").text(batnow);
     
     for(i=0;i<nowoppo.length;i++){
      
       if(nowoppo[i]!=""&&nowoppo[i][1].itstype!="building"&&Math.floor((17-i)/3)<=nowoppo[i][1].attdis){
        
         $("#oppo"+nowoppo[i][0]).animate({top:"-=20px",backgroundColor:"#ffc00f"},800);
         $("#oppo"+nowoppo[i][0]).animate({top:"+=30px"},300);
         
         $("#oppo"+nowoppo[i][0]).animate({top:"-=10px",backgroundColor:"#f9f1db"},800);
         nowatt=nowoppo[i][1].att;
         setTimeout("hurt()",1200)
         
         
       }
     }
     
     //敌人前进
     for(i=0;i<12;i++){
              if(nowoppo[11-i]!=""&&nowoppo[14-i]==""&&nowoppo[11-i][1].itstype!="building"){
                 
                  iddd=nowoppo[11-i][0];
                  ddd=nowoppo[11-i];
                  $("#oppo"+iddd).animate({top:"+=100px"});
                  nowoppo[11-i]="";
                  nowoppo[14-i]=ddd;
              }
      }
     
     
     //给敌人发牌
     coppoc(false);
     
     
     
     
     
     
     
}

