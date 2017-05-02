$(function(){
  
  //alert("intoCheckRegist");
  //姓名字数限制
  $('#account').keyup(function(){
      var val = $(this).val().substring(0,12);
      $(this).val(val);
  });
 
  //提交判断
  $('#submit').click(function(){
    var account = $('#account').val();
    var psw = $('#password').val();

	//判断信息不为空
	if (!isEmpty(account) || !isEmpty(psw))	{	
			if (valiInput(account)){//判断非法字符
					if($.cookie("name") == account && $.cookie("psw") == psw){
						alert("登录成功");
						window.location.href= "personal.html";
					}else{
						alert("账号或密码错误");
					}
					
		}else{
			alert("姓名不能含有非法字符");
		}
		
	}else{
		alert("请将信息填写完整！");
	}
  });
});

/**
* 判断为空*/
var isEmpty = function(obj) {
  if (obj == null || obj == undefined || jQuery.trim(obj).length == 0 || obj == "" || obj === "null") {
    return true;
  }
  return false;
};




/**
* 验证输入框是否有非法字符
 */ 
var valiInput = function(obj){
  
  var patrn=/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;  
  
  if (patrn.test(obj)) {
    return false;
  } else {
    return true;  
  }
};