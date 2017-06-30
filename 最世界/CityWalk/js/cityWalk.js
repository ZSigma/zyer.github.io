/**
 * Created by Auser on 2016/11/10.
 */
$(function(){
    var logo_p1 = document.getElementsByClassName("logo_p1")[0];
    var inp = logo_p1.getElementsByTagName("input")[0];
    var ul = logo_p1.getElementsByTagName("ul")[0];
    inp.onfocus = function(){
        ul.style.display = "block";
    };
    inp.onblur = function(){
        ul.style.display = "none";
    };
});


//封装ajax请求
function getData(url,data,success){
    var xml = window.XMLHttpRequest? new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
    xml.open("GET",url+data,true);
    xml.onreadystatechange = function(){
        if(xml.readyState == 4 && xml.status == 200){
            success(xml.responseText);
        }
    };
    xml.send(null);
}

//等页面加载完执行ajax请求
$(function(){
    getData("http://127.0.0.1:8989/getCityWalk","",getCityWalk);
});

//定义回调函数

function getCityWalk(data){
    var cityWalkObj = JSON.parse(data);

    var show = document.getElementById("show");
    var cityWalkArr = cityWalkObj.msg;
    for(var t = 0;t<cityWalkArr.length;t++){
        var title = cityWalkArr[t].title;
        var address = cityWalkArr[t].address;
        var imgurl = cityWalkArr[t].imgurl;
        var oldPrice = cityWalkArr[t].oldPrice;
        var newPrice = cityWalkArr[t].newPrice;
        var browseCount = cityWalkArr[t].browseCount;
        var soldCount = cityWalkArr[t].soldCount;

        var show_1 = document.createElement("div");
        show_1.className = "show_1";
        show.appendChild(show_1);
        var pic = document.createElement("span");
        pic.className ="pic";
        show_1.appendChild(pic);
        var a1 = document.createElement("a");
        a1.style.background = "url("+imgurl+")";
        pic.appendChild(a1);
        var show_1_1 = document.createElement("div");
        show_1.appendChild(show_1_1);
        var num = document.createElement("p");
        show_1_1.appendChild(num);
        var b1 =document.createElement("b");
        b1.innerHTML = address;
        num.appendChild(b1);
        var em1 = document.createElement("em");
        em1.className = "num1";
        num.appendChild(em1);
        em1.innerHTML = browseCount;
        var span1 = document.createElement("span");
        span1.innerHTML = "次浏览 ";
        num.appendChild(span1);
        var em2 = document.createElement("em");
        em2.className = "num1";
        em2.innerHTML =soldCount;
        num.appendChild(em2);
        var span2 = document.createElement("spam");
        span2.innerHTML = "件已售";
        num.appendChild(span2);


        var des = document.createElement("p");
        des.className = "des";
        des.innerHTML = title;
        show_1_1.appendChild(des);

        var a2 = document.createElement("a");
        a2.innerHtML = title;
        des.appendChild(a2);
    }
}