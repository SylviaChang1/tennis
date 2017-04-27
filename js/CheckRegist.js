$(function(){
  
  //alert("intoCheckRegist");
  //姓名字数限制
  $('#name').keyup(function(){
      var val = $(this).val().substring(0,12);
      $(this).val(val);
  });
  //手机号字数限制
  $('#phonenumber').keyup(function(){
      var val = $(this).val().substring(0,11);
      $(this).val(val);
  });

  /*//无法写入数字  
  $('#name').keyup(function(){
      var name = $('#name').val();
      $('#name').val(name.replace(/[^\u4E00-\u9FA5/^a-zA-Z]/g,''));
  });*/
	
	//姓名失去焦点
	$('#name').blur(function(){
	  var name = $('#name').val();
	  if (!isEmpty(name)) {
			if (valiInput(name)){
				$('#namePass').html("通过");
			}else{
				$('#nameAlert').html("含有非法字符");
			}
	  }else{
		$('#nameAlert').html("名字不能为空");
	  }
	});
	//姓名获取焦点
	$('#name').focus(function(){
		//alert("你的名字写的不对");
		$('#nameAlert').html("");
		$('#namePass').html("");
	});


	//密码1失去焦点
	$('#password1').blur(function(){
	  var password1 = $('#password1').val();
	  if (!isEmpty(password1)) {
			if (password1.length>=6 && password1.length<20){
				$('#pass1Pass').html("通过");
			}else{
				$('#pass1Alert').html("6~12位密码");
			}
	  }else{
		$('#pass1Alert').html("密码不能为空");
	  }
	});
	//密码1获取焦点
	$('#password1').focus(function(){
		//alert("你的名字写的不对");
		$('#pass1Alert').html("");
		$('#pass1Pass').html("");
	});


	//密码2失去焦点
	$('#password2').blur(function(){
	  var psw1 = $('#password1').val();
	  var psw2 = $('#password2').val();
	  if (!isEmpty(psw2)){
	    if (psw1 == psw2) {
			$('#pass2Pass').html("通过");
		}else{
			$('#pass2Alert').html("两次密码不一致");
		}
	  }else{
			$('#pass2Alert').html("密码不能为空");
	  }
	});
	//密码2获取焦点
	$('#password2').focus(function(){
		$('#pass2Alert').html("");
		$('#pass2Pass').html("");
	});


	//手机号失去焦点
	$('#phonenumber').blur(function(){
	  var phone = $('#phonenumber').val();
	  if (!isEmpty(phone)) {
		 var reg = /^1[3|4|5|8]\d{9}$/;
		 if (reg.test(phone)) {
            $('#phonePass').html("通过");
        } else {
			$('#phoneAlert').html("手机号格式错误");
        }		
	  }else{
		$('#phoneAlert').html("手机不能为空");
	  }
	});
	//手机号获取焦点
	$('#phonenumber').focus(function(){
		$('#phonePass').html("");
		$('#phoneAlert').html("");
	});


	//邮箱失去焦点
	$('#email').blur(function(){
	  var email = $('#email').val();
	  if (!isEmpty(email)) {
		   var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
			if (reg.test(email)){
				$('#emailPass').html("通过");
			}else{
				$('#emailAlert').html("邮箱格式不正确");
			}
	  }else{
		$('#emailAlert').html("邮箱不能为空");
	  }
	});
	//邮箱获取焦点
	$('#email').focus(function(){
		$('#emailAlert').html("");
		$('#emailPass').html("");
	});

  
  //提交注册
  $('#submit').click(function(){
	  //alert("submit");
    var name = $('#name').val();
    var psw1 = $('#password1').val();
    var psw2 = $('#password2').val();
    var phonenumber = $('#phonenumber').val();
    var email = $('#email').val();
	var agree = $('input[name="agree"]:checked').val();

	//判断信息不为空
	if (!isEmpty(name) || !isEmpty(psw1)|| !isEmpty(psw2)
					   || !isEmpty(phonenumber) || !isEmpty(email))	{
		if (!isEmpty(agree))
		{	
			if (valiInput(name)){//判断非法字符
			if (phonenumber.length=11){
				if (psw1.length>=6 && psw1.length<20){
					if(psw1 == psw2){
						
						$.cookie("name", name);//设置cookie 名字，值
						$.cookie("psw", psw1);//设置cookie 名字，值
						$.cookie("phonenumber", phonenumber);//设置cookie 名字，值
						$.cookie("email", email);//设置cookie 名字，值
						alert("注册成功!请牢记，用户名："+name);
						window.location.href = "../index.html";
						//alert($.cookie("name")); //根据cookie名字取到cookie值
						//alert($.cookie("psw")); //根据cookie名字取到cookie值
						//alert($.cookie("phonenumber")); //根据cookie名字取到cookie值
						//alert($.cookie("email")); //根据cookie名字取到cookie值
						
					}else{
						alert("两次密码不一致");
					}
				}
				else{
					alert("密码在6到12位");
				}
			}else{

				alert("请输入正确的手机号");
			}
		}else{
			alert("姓名不能含有非法字符");
		}
		}else{
			alert("必须同意条款");
		}
	}else{
		alert("请将信息填写完整！");
	}
  });
});


/**
 * 传输手机号到后台，检验该手机号是否已被注册
 * 查询返回的结果为0或1，0表示该手机号为被注册，1表示该手机号已被注册
 */
function queryPhoneNumIsExist(phoneNum){
  $.ajax({
    url:WEBROOT+'/user/isExsit.do',
    type:'post',
    data:{
      phoneNum:phoneNum
    },
    success:function(res){
      if(res.resultCode==AJAX_CODE_SUCCESS){
        if(res.isExsit==0){
          $('#phoneNumIsRegist').hide();
          $('#phoneNumIsRegist').html("该手机号未被注册");
        }
        else if(res.isExsit==1){
          $('#phoneNumIsRegist').show();
          $('#phoneNumIsRegist').html("该手机号已被注册");
        }
      }
      else if(res.resultCode==AJAX_CODE_FAIL){
        alert("手机号是否存在验证失败，请重新输入");
      }
    }
  });
}


/**
 * 判断为空
 */
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