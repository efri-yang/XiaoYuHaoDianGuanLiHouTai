layui.define(['jquery','throttleDebounce'],function(exports){ //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
  
  "use strict";
  
  var $ = layui.$;
  $.fn.sideMenu=function(options){
  	//this 是jquery 对象
  	var defaults={
  		 distance:70
  	},
  	opts=$.extend(true,defaults,options),
  	$lis=this.children("li"),
  	liH=$lis.children('a').eq(0).height(),
  	totalH=liH*$lis.length+opts.distance;

    var winH,remainH,$win=$(window),Timer;
     
    $win.on("resize",$.throttle(500,function(){
          winH=$win.height();
          remainH=winH-totalH;
          if(remainH < 50){
            remainH=winH-100;
          }
    })).trigger('resize')
    
    $lis.each(function(index, el) {
        var $el=$(el),$childUl=$el.children('.treeview-menu');
        if($el.hasClass('active')){
          $childUl.css("max-height",remainH);
        }else{
          $childUl.css("max-height",0);
        }
        $el.children('a').on("click",function(){
            
            var $this=$(this);
            
                 var $siblingUl=$this.siblings('ul'),
                  $parent=$this.parent(),
                  $parentSibling=$parent.siblings();
              if($parent.hasClass('active')){
                  $parent.removeClass('active');
                  $siblingUl.css("max-height",0);
              }else{
                  $parentSibling.removeClass('active');
                  $parent.addClass('active');
                  $siblingUl.css("max-height",remainH);
                  $parentSibling.children('.treeview-menu').css("max-height",0);
              }
           
               
        })
    });
  }

  $(function(){
       $(".com-side-menu").sideMenu();
  })
  //输出test接口
  exports('sideMenu', $.fn.sideMenu);
});  


// (function(el,siblingUl,parentLi,parentLis){
//           el.on("click",function(){
//               if(parentLi.hasClass('active')){
//                   siblingUl.css("max-height",0);
//                   parentLi.removeClass('active');
                  
//               }else{
//                 siblingUl.css("max-height",remainH);
//                 parentLi.addClass('active');
//                 parentLis.removeClass('active').children('ul').css("max-height",0);

//               }
//         })
//       })($childA,$childUl,$el,$lis);