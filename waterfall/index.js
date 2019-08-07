var oLi = document.getElementsByTagName('li');
var falg = false;
var num = 1;//避免重复请求ajax数据
function send(){
    if(falg !=true){
        ajax('GET','./getPics.php', dealData, 'cpage='+num,true);
        falg = true;
        num++;
    }
}
send();

function dealData(data){
    var data = JSON.parse(data);
    console.log(data);
    if(data.length>0) {
        data.forEach(function(ele,idnex){
        var oItem = document.createElement('div');
        oItem.className = 'item';
        var oImg = new Image();
        oImg.src = ele.image;
      

        oImg.height = 230*ele.height/ele.width;//图片未加载之前提前预留空间,这样滚动条不会向上滚.也避免了了图片因为未加载出来重复在同一条上面加载
         oItem.appendChild(oImg);
        oLi[findShortest(oLi)].appendChild(oItem);//给高度最短的添加图片

        } );
        falg = false;
}else{
    alert('加载完成');
  }
}
//寻找最短位数
function findShortest(list){
    var len = list.length;
    var min = list[0].offsetHeight;
    var index = 0;
    for(var i = 1;i<len;i++){
        var h =list[i].offsetHeight;
        if(h<min){
            min = h;
            index = i;
        }
    }
    return index;
}

//到页面底下后重新加载数据
window.onscroll = function(){
   var index =  findShortest(oLi);
   var h  = oLi[index].offsetHeight;//最短高度
   var scorollHeight = document.documentElement.scrollTop ||document.body.scrollTo;
   var clientHeight =  document.documentElement.clientHeight || document.body.clientHeight;
    
   if(scorollHeight+clientHeight>h){
    send();   
   }
}
