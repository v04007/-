var oAudio = document.getElementById("audio"),
oCurrentTime = document.getElementsByClassName("current-time")[0],
oAllTime = document.getElementsByClassName("all-time")[0];
oBtn = document.getElementsByClassName("btn")[0];
olsPlay = oBtn.getElementsByClassName("iconfont")[0];
Proactive = document.getElementsByClassName("pro-active")[0];
oRadiobox = document.getElementsByClassName("radio-box")[0];
oProBox = document.getElementsByClassName("por-box")[0];
oVolume = document.getElementsByClassName("volume")[0];
var timer ,
    duration ;//到一定时间我们要清除一下计时器，所以我们在外部设置一个变量来包含计时器
var bgWidth = 232 ;
window.onload = function(){//oncanplay资源加载完成
    oCurrentTime.innerHTML = conversion(oAudio.currentTime);
    duration = oAudio.duration
    oAllTime.innerHTML=conversion(duration); //duration获取文件时长
    // console.log(this);
}

function conversion(time){
    var sec = parseInt(time%60)< 10 ? "0"+parseInt(time%60):parseInt(time%60);//秒
    var min = parseInt(time/60)< 10 ? "0"+parseInt(time/60):parseInt(time/60);//分
    return min+":"+sec;
}

oBtn.onmouseup = function (){
    if(oAudio.paused){//true 指示音频/视频已暂停。否则为 false
        musicPlay();
    }
    else{
        musicPause();
    }
}
function musicPlay(){
    oAudio.play();//play()开始播放当前的音频或视频
    olsPlay.className="iconfont icon-zanting1";
    timer = setInterval(movePro,100);//计时器这里movePro方法后面不能加（），加了之后就会立即执行，不添加就会100毫秒调用一次，
    //值越小越精准
}
function musicPause(){
    oAudio.pause();//pause()停止当前播放的音频或视频
    olsPlay.className="iconfont icon-zanting";//替换className时要注意大小写
    clearInterval(timer);//清楚计时器
}

//获取当前时长
function movePro(){
    var currentTime = oAudio.currentTime;
    oCurrentTime.innerHTML = conversion(currentTime);//进度时间
    Proactive.style.width = currentTime/duration * bgWidth + 8+"px";//当前时长比上总时长，就等于当前宽度比上总宽度，再乘以进度条再加上自身宽度
}

//计算进度条长度像素时候我们要注意了，要清除小圆点的像素
oAudio.onended = function(){ //onended当视频播放结束后执行 
    musicPause();
    oAudio.currentTime = 0;
    oCurrentTime.innerHTML = conversion(0);
    Proactive.style.width = 8 + "px";
    oAudio.src = "./source/音乐2.mp3";
    oAudio.load();
    musicPlay();
}
oRadiobox.onmousedown = function(){//onmousedown是在鼠标按下之后触发的事件
    clearInterval(timer);
   var c = oAudio.currentTime;
   document.body.onmousemove = function (e){
      var newWidth = e.clientX - oProBox.getBoundingClientRect().left;//getBoundingClientRect().left当前元素距离左侧值
    //    console.log(newWidth);
      if(newWidth < 8){
        newWidth = 8;
       }
       else if(newWidth > 240){
        newWidth = 240;
       }
       Proactive.style.width = newWidth + "px";
       c = (newWidth - 8)/bgWidth * duration;
       oCurrentTime.innerHTML = conversion(c);
   }
   document.body.onmouseup = function(){//鼠标移出
       document.body.onmousemove = null;
       document.body.onmouseup = null;
       musicPlay();
       oAudio.currentTime = c;
   }
   
}

oVolume.onclick = function (){
    var v = document.getElementsByClassName("v-wrapper")[0];
    if(v.style.display != "block"){
        v.style.display ="block"; 
    }else{
        v.style.display = "none";
    }
}
var radiov = document.getElementsByClassName("radio-v")[0];
var box = document.getElementsByClassName("v-box")[0];
var vactive = document.getElementsByClassName("v-active")[0];
var v;
box.onmousedown = function(){    
     box.onmousemove = function (y){
        var newheight = Math.abs(y.clientY - box.getBoundingClientRect().bottom);
        // console.log(newheight);
        if(newheight < 0){
            newheight = 0;
           }
           else if(newheight > 100){ 
            newheight = 100;
           }
           vactive.style.height = newheight +"px";
           v = newheight/100;
           console.log(v);
           oAudio.volume = v;
     }
    

     box.onmouseup = function(){//鼠标移出
        box.onmousemove = null;
        box.onmouseup = null;
        
        console.log("触发了");
}
}
var Right = document.getElementsByClassName("right")[0];
Right.onclick = function (){
    oAudio.src = "./source/音乐3.mp3";
    oAudio.load();
    musicPlay();
}
var Left = document.getElementsByClassName("left")[0];
Left.onclick = function (){
    oAudio.src = "./source/音乐2.mp3";
    oAudio.load();
    musicPlay();
}

oAudio.ended