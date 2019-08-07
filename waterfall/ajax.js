function ajax(method,url,callback,data,flag){//2创建一个Ajax,请求方式,请求地址,回调函数,传参不需要为空,同步还是异步
    var xml = null;
    if(window.XMLHttpRequest){//widow下面如果有XMLHttpRequest我就让他等于 xml = new XMLHttpRequest();方法,XMLHttpRequest匹配火狐谷歌ie6以上
        xml = new XMLHttpRequest();
    }else{//兼容ie6浏览器
        xml = new ActiveXObject('Microsoft.XMLHttp');
    }
method = method.toUpperCase();//toUpperCase转换为大写
var data = new Date();
var timer = data.getTime()
console.log(timer);
//前面写了get和post方法现在把两个封装起来
if(method == 'GET'){
    xml.open(method,url+'?'+data+'&tiemr='+timer ,flag);
    xml.send()
}else if(method == 'POST'){
    xml.open(method, url,flag);
    xml.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xml.send(data);
}

//3初始化http,open里面传请求参数,(请求方式,地址,同步还是异步)
//xml.open('POST','./post.php',true);//'GET'从服务器里面拿数据'POST'传数据3xml.open()用来初始化,请求方式最好用大写方式来写,当传trun代表异步请求false代表同步请求

//4发送请求Ajax下面有一个send()方法能帮我们发送请求
//xml.send();send方法执行后就变成1了说以不会打印0-1之间的1,get请求直接这么写xml.send()就可以

//xml.setRequestHeader('Content-Type','application/x-www-form-urlencoded');//post方法固定书写格式,这是url格式编码,可以通过ur格式l解析
//xml.send(data);//post书写格式
//5.onreadystatechange监控变化,数据监控4个步骤,到第四个就请求完成
xml.onreadystatechange =function(){
   console.log(xml.readyState);    
   if(xml.readyState ==4){
     if(xml.status ==200){//6状态码状态用xml.status来获取,判断,返回的数据储存在xml.responseText里面,是JSON
        callback(xml.responseText);
       
        //  AD(xml.responseText);
        
      }
    }
}
}
// function cbs(data){
//     console.log(data);
//} 

   