// JavaScript Document
$(document).ready(function(){

//最右侧微信分享
$('.fixed_pic .wx').hover(function(){
$('.fixed_pic_box .wx_box').fadeIn(200);
},function(){
$('.fixed_pic_box .wx_box').fadeOut(200);
});

//相关链接微信分享
$(".relation_right .wx").hover(function(){
$(".relation_right .wx_box").fadeIn(200);
},function(){
$(".relation_right .wx_box").fadeOut(200);
});

//最右侧微信分享
$(".wb").hover(function(){
$(".wb_box").fadeIn(200);
},function(){
$(".wb_box").fadeOut(200);
});

//主体左侧底部，球员排名男子女子选择
$(".sex_selet li").click(function(){      
if ($(this).hasClass("selet")) 
{

	return true;
}
else {
	$(".sex_selet li").removeClass("selet");
	$(this).addClass("selet");
	
	$(".left_bottom_men").hide();
	$(".left_bottom_men").next().show();
}
});

//球员排名
$(".left_bottom_men").find("li").each(function(index){
			$(".left_bottom_men").find("li:even").eq(index).mouseover(function(){
				$(".left_bottom_men").find("li:even").show();
				$(".left_bottom_men").find("li:odd").hide();
				$(this).hide();
				$(this).next().show();
			});
			
		});

		$(function(){
		$("ul").on('click','li',function(){
			$(this).addClass("current").siblings().removeClass("current").parent().
			next().find("div").eq($(this).index()).show().siblings().hide();
		});
	});

	//新闻快讯right2_detail
	$(".subject_right2").find("li").hover(function(index){
		var i = $(this).index();
		//alert(i);
		$(".subject_right2").find("li").each(function(index){
		
			$(".subject_right2").children("ul:eq(0)").children("li:eq("+i+")").find("a").eq(index).hover(function(){
				$(".subject_right2").children("ul:eq(0)").children("li:eq("+i+")").find(".right2_detail").show();
					},function(){       
					$(".subject_right2").children("ul:eq(0)").children("li:eq("+i+")").find(".right2_detail").hide();
			});
			
		});
	});

});
