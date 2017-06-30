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
                console.log(k);
                //当触发事件的标签下标不等于前一个触发标签的下标时
                if(arr[arr.length-1]!=arr[arr.length-2]){for(var i =0;i<contentAll.length;i++) {
                    contentAll[i].style.display = "none";
                    aAll[i].setAttribute("style","color: #636363;border-bottom:3px solid transparent");
                }}
                $(contentAll[k]).fadeIn(500);

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
        if($("body")[0].scrollTop>766){
            $top.css("display","block");
        }
        //console.log($("body")[0].scrollTop);
    });
    $top.click(function(){
       var time= setInterval(function(){
            $("body")[0].scrollTop-=100;
            console.log($("body")[0].scrollTop);
           if( $("body")[0].scrollTop==0){
               clearInterval(time);
           }
        },30);
    })
});