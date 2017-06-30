/**
 * Created by Auser on 2016/11/7.
 */

//轮播图
//window.onload=;
function animate(){
    var wrap = document.querySelector("#wrap");
    var middle = document.querySelector("#wrap2");
    var divs = document.querySelectorAll("#wrap2>div");
    var last = document.querySelector(".wrap_p3");
    var next = document.querySelector(".wrap_p4");
    var inputs = document.querySelectorAll("arrow");
    var spans = document.querySelectorAll(".focus>span");

    var w = wrap.offsetWidth;
    var index = -1;

    middle.style.width = w*divs.length + "px"; //4个div的总宽
    spans[0].style.background = "#ff7467";
    nextFn();
    function nextFn(){
        index++;
        if (index>divs.length-1){
            index = 0;
        }
        var l = -index * w;
        middle.style.left = l + "px";
            for(var num = 0;num<3;num++) {
                spans[num].style.background = "#800b25";
                spans[num].onclick = spansClick;
                spans[num].count = num;
            }
        spans[index].style.background =  "#ff7467";
    }
    var timer = setInterval(function (){

        nextFn();
    },2000);

    function clearTimer(){
        clearInterval(timer);
        timer = setInterval(function (){

            nextFn();
        },2000);
    }

    next.onclick = function (){
        clearTimer();
        nextFn();

    };

    last.onclick = function (){

        index--;
        if (index<0){
            index = divs.length-1;
        }
        var l = -index*w;
        middle.style.left = l + "px";

        clearTimer();
    };

    for (var i=0,len=inputs.length; i<len; i++){

        inputs[i].index = i;
        inputs[i].onclick = function (){
            index = this.index;
            var l = -this.index*w;
            middle.style.left = l + "px";
            clearTimer();
        }
    }

    function spansClick(){
        middle.style.left = -this.count*w+"px";
        for(var num = 0;num<3;num++) {
            spans[num].style.background = "#800b25";
        }
        spans[this.count].style.background =  "#ff7467";
    }

    wrap.onmouseover = function(){
        clearInterval(timer);
    };
    wrap.onmouseout = function (){
        clearTimer();
    };

}

$(function(){
    defaultFun();
    animate()
});
function defaultFun(){
    var $inp_1 = $(".banner1_inp");
    var $ul = $(".banner1_ul");
    $inp_1.focus(function(){
        $ul.css("display","block");
    });
    $inp_1.blur(function(){
        $ul.css("display","none");
    })

}

//机酒自由行
$(function(){
    changeItem("content_5_1");
    changeItem("content_6_1");
    changeItem("content_7_1");

});
function changeItem(clasName){
    //获取div块
    var contentAll = document.getElementsByClassName(clasName)[0].getElementsByClassName("content");
    //console.log(contentAll);
    //contentAll[0].style.display = "block";
    //获取导航栏a标签
    var aAll = document.getElementsByClassName(clasName)[0].getElementsByClassName("content_span")[0].getElementsByTagName("a");
    aAll[0].setAttribute("style","color: #16C1A0;border-bottom:3px solid #16C1A0");
    //定义一个存放a标签下标的数组
    //console.log(aAll);

    var arr = [0];
    for(var j = 0;j<aAll.length;j++){
        (function(k){
            aAll[k].onmouseover = function(){
                aAll[k].index = k;
                arr.push(k);
                //console.log(k);
                //当触发事件的标签下标不等于前一个触发标签的下标时
                if(arr[arr.length-1]!=arr[arr.length-2]){for(var i =0;i<contentAll.length;i++) {
                    contentAll[i].style.display = "none";
                    aAll[i].setAttribute("style","color: #636363;border-bottom:3px solid transparent");
                }}
                $(contentAll[k]).stop(true);
                $(contentAll[k]).fadeIn(500);
                getLeft();

                //给a标签添加移入样式
                this.setAttribute("style","color: #16C1A0;border-bottom:3px solid #16C1A0");
            }
        })(j)
    }
}


//返回顶部
$(function(){
    var $top = $("#toTop");
    var $body = $("body");
    $(window).scroll(function(){
        if($body[0].scrollTop>766){
            $top.show(500);
        }if($body[0].scrollTop<766){
            $top.hide(500);
        }
        //console.log($("body")[0].scrollTop);
    });
    $top.click(function(){
       var time= setInterval(function(){
           $body[0].scrollTop-=50;
            //console.log($("body")[0].scrollTop);
           if( $body[0].scrollTop==0){
               clearInterval(time);
           }
        },10);
    })
});


$(function(){
    getLeft();
});
function getLeft(){
    var $type = $(".type");
    var $price = $(".price");
    //$price.css("left",$type.width()+"px");
    for(var i =0;i<$type.length;i++){
        $price[i].style.left = $type[i].offsetWidth+"px";
        //console.log($type[6].offsetWidth);
    }}


//页面加载完后发起ajax请求
$(function(){
    getData("http://127.0.0.1:8989/getMenu","",successMenu);
    getData("http://127.0.0.1:8989/getBanner","",successBanner);
    getData("http://127.0.0.1:8989/getFreeWalk","",successFreeWalk);
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

function successMenu(data){
    //获取标签
    var wrap_p1 = document.getElementsByClassName("wrap_p1");
    var wrap_p2 = document.getElementsByClassName("wrap_p2");
    //因为鼠标移入到菜单时轮播图会停止，取消冒泡事件
    var ul3 = document.getElementById("wrap").getElementsByTagName("ul")[0];
    ul3.onmouseover = function(e){
        e.stopPropagation();
    };
    ////获取到数据
    var menuObj = JSON.parse(data);
    var menuArr = menuObj.msg;
    for(var j = 0;j<menuArr.length;j++){
        var title = menuArr[j].title;
        wrap_p1[j].innerHTML = title;
    //
        var mainCity = menuArr[j].mainCity;
        for(var k = 0;k<mainCity.length;k++){
            var a= document.createElement("a");
            a.innerHTML = mainCity[k];
            a.style.cursor = "pointer";
            wrap_p2[j].appendChild(a);
        }


        var moreCityImg = menuArr[j].moreCityImg;
        console.log(moreCityImg);
        var category_ul4 = document.createElement("ul");
        category_ul4.className = "category_ul4";
        var category_ul4_li = document.createElement("li");
        var category_ul4_a = document.createElement("a");
        category_ul4_a.style.background="url("+moreCityImg+")";
        category_ul4.appendChild(category_ul4_li);
        category_ul4_li.appendChild(category_ul4_a);
    //
        var moreCity = menuArr[j].moreCity;
        //var category_content = document.getElementsByClassName("category-content");
        var category_content_1 = document.getElementsByClassName("category-content_1");
        for(var l=0;l<moreCity.length;l++){
            var ul1 = document.createElement("ul");
            var li1 = document.createElement("li");
            var li2 = document.createElement("li");
            var h2 = document.createElement("h2");
            var items = moreCity[l].items;
            for(var m=0;m<items.length;m++) {
                var a = document.createElement("a");
                    a.innerHTML = items[m];
                    a.style.cursor = "pointer";
                    li2.appendChild(a);
                    h2.innerHTML = moreCity[l].cityName;
                }
                li1.appendChild(h2);
                ul1.appendChild(li1);
                ul1.appendChild(li2);
                if(j!=3) {

                    if (l <= 1) {
                        category_content_1[2 * j].appendChild(ul1);
                    } else {
                        category_content_1[2 * j + 1].appendChild(ul1);
                        category_content_1[2 * j + 1].appendChild(category_ul4);

                    }
                }
                else {
                    if (l == 0) {

                        category_content_1[2 * j].appendChild(ul1);
                    } else {
                        category_content_1[2 * j + 1].appendChild(ul1);
                        category_content_1[2 * j + 1].appendChild(category_ul4);
                    }
                }
            }



        }

}

//加载轮播图数据
function successBanner(data){
    var bannerObj = JSON.parse(data);
    var msgArr = bannerObj.msg;
    var wrap_div = document.getElementById("wrap2").getElementsByTagName("div");

    for(var i = 0;i<=msgArr.length-2;i++){
        var imgUrl = msgArr[i].imgUrl;
        wrap_div[i].style.background = "url("+imgUrl+") -300px 0";
        (function(m){
            wrap_div[m].onclick = function(){
                window.location.href=msgArr[m].href;
            }
        })(i)
    }

}



function successFreeWalk(data){
    var freeWalkObj = JSON.parse(data);
    //console.log(freecityObj);
    var freeWalkArr = freeWalkObj.msg;
    var content_span =document.getElementsByClassName("content_span")[0];
    var content_span_child = content_span.children;
    for(var n =0;n<freeWalkArr.length;n++) {
        var title = freeWalkArr[n].title;
        content_span_child[n].innerHTML = title;

        var content = document.getElementsByClassName("content")[n];
        var  data = freeWalkArr[n].data;
        for (var p = 0; p < data.length; p++) {
            var price = content.getElementsByClassName("price");
            var description = content.getElementsByClassName("description");
            var date = content.getElementsByClassName("date");
            var bag = content.getElementsByClassName("background");
            var bag2 = content.getElementsByClassName("background2");
            description[p].innerHTML = data[p].title;
            price[p].getElementsByTagName("em")[0].innerHTML = data[p].price;
            if(p==0){
                bag[p].style.background = "url(" + data[p].imgUrl + ")";
                date[p].innerHTML = data[p].time;
            }else{
                bag2[p-1].style.background = "url(" + data[p].imgUrl + ")";

            }

        }
    }
}