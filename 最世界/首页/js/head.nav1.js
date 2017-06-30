/**
 * Created by Auser on 2016/11/8.
 */
window.onload = search;
function search(){
    //navÏÂµÄËÑË÷¿ò
    var $input = $(".head_nav1_inp");
    var $b = $(".search");
    $b.mouseover(function(){
        $b.css("backgroundColor","#fff");
        $input.css("background","#fff");
    });
    $b.mouseout(function(){
        $input.css("background","#323232");
        $b.css("backgroundColor","#323232");
    });

}

$(function(){
    var $li1 = $(".community_li1");
    var $li2 = $(".community_li2");
    $li1.click(function(){
        window.location.href="http://bbs.qyer.com";
    });
    $li2.click(function(){
        window.location.href="http://jne.qyer.com";
    });


    //$a2 = $(".a2:first");
    //var $community = $(".community");
    //$a2.mouseover(function(){
    //    $community.fadeIn(100);
    //});
    //$a2.mouseout(function(){
    //    setTimeout(function(){$community.hide(100)},500);
    //})
});