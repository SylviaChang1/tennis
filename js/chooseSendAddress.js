$(function (){
  /**
   * 百度地图API功能
   * */
  var map = new BMap.Map("allmap");    // 创建Map实例
  var point = new BMap.Point(103.995949,30.585983); // 创建点坐标116.404, 39.915（北京市，天安门）
  map.centerAndZoom(point, 15);  // 初始化地图,设置中心点坐标和地图级别
  map.enablePinchToZoom();//启用双指放缩
  map.disableDoubleClickZoom();//禁用双击放大 
  
  //左上角，添加默认缩放平移控件
  var top_left_navigation = new BMap.NavigationControl();
  //左上角，添加比例尺
  var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});
  map.addControl(top_left_control);
  map.addControl(top_left_navigation);
  /**
   * 根据浏览定位
   * */
  var geolocation = new BMap.Geolocation();
  geolocation.getCurrentPosition(function(r){
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
      map.panTo(r.point);//跳转页面
      addMarker(r.point);//标注新的送餐地址
      //逆地址解析,并将坐标点和解析地址通过Ajax传送到后台
      getAllAddressAndPutAllAddressToBackstage(r.point);
    }
    else {
      alert('failed'+this.getStatus());
    }
  },{enableHighAccuracy: true})
/***
 * 关键字输入提示
 * */
  // 百度地图API功能
  function G(id) {
    return document.getElementById(id);
  }
  
  var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
    {"input" : "suggestId"
    ,"location" : map
  });
  
  ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
    var str = "";
      var _value = e.fromitem.value;
      var value = "";
      if (e.fromitem.index > -1) {
        value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
      }    
      str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
      
      value = "";
      if (e.toitem.index > -1) {
        _value = e.toitem.value;
        value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
      }    
      str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
      G("searchResultPanel").innerHTML = str;
    });
  
  var myValue;
  ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
  var _value = e.item.value;
    myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
    
   setPlace();
  });

  function setPlace(){
    map.clearOverlays();    //清除地图上所有覆盖物
    function myFun(){
      var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
      map.centerAndZoom(pp, 15);
      addMarker(pp);    //添加标注
      getAllAddressAndPutAllAddressToBackstage(pp);
    }
    var local = new BMap.LocalSearch(map, { //智能搜索
      onSearchComplete: myFun
    });
    local.search(myValue);
  }
  
  
  $('#jumpMap').click(function(){
    var address = $('#suggestId').val();
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(address, function(point){
      if (point) {
        map.centerAndZoom(point, 16);
        map.addOverlay(new BMap.Marker(point));
      }else{
      alert("请按省、市、县区、街道的顺序填写地址");
      }
    }, "北京市");
  });
/**
 * 关键字输入提示到此结束
 * */
  
  /**
   * 单击获取点击的经纬度,并标注
   * */
  map.addEventListener("click",function(e){
    alert(e.point.lng + "," + e.point.lat);
    map.clearOverlays();  //清除之前选择的送餐地址
    addMarker(e.point);//标注新的送餐地址
    //逆地址解析,并将坐标点和解析地址通过Ajax传送到后台
    getAllAddressAndPutAllAddressToBackstage(e.point);
  });
  
  /**
   * 添加标注
   * */
  function addMarker(point){
    var marker = new BMap.Marker(point);
    map.addOverlay(marker);//将标注添加到地图中
    //marker.enableDragging();//标注可拖拽
    marker.disableDragging(); //标注不能拖拽
  }
  
  /**
   * 逆地址解析,并将坐标点和解析地址通过Ajax传送到后台
   * */
  function getAllAddressAndPutAllAddressToBackstage(point){
    var geoc = new BMap.Geocoder();
    geoc.getLocation(point, function(rs){
      var addComp = rs.addressComponents;
      var address = addComp.province + ", " + addComp.city + ", " 
                    + addComp.district + ", " + addComp.street + ", " 
                    + addComp.streetNumber;
	  $("#positionStr").html(address);
      var headquarters = new BMap.Point(104.07238,30.664111);
      var distance = map.getDistance(point,headquarters).toFixed(2);//获取两点距离,保留小数点后两位
//      alert(distance);
      //putAddressInfomationToBackstage(point.lng, point.lat, address, distance);
      //alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
    });
  }
  
});

///**
// * 传输坐标点和解析地址到后台
// */
//function putAddressInfomationToBackstage(pointLeft,pointRight,address,distance){
//  $.ajax({
//	url:WEBROOT+'/user/putAddressInformationIntoSession.do',
//	type:'post',
//	data:{
//	  pointLeft:pointLeft,
//	  pointRight:pointRight,
//	  address:address,
//	  distance:distance
//	},
//	success:function(res){
//	  if(res.resultCode == AJAX_CODE_SUCCESS){
//		$('#isChoose').html("choose");
//	  }
//	  else if(res.resultCode == AJAX_CODE_FAIL){
//		alert("地址保存失败，请重新选择");
//	  }
//	}
//  });
//}