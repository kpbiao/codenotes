/*map对象*/
function Map() {
 var struct = function(key, value) {
  this.key = key;
  this.value = value;
 }
 
 var put = function(key, value){
  for (var i = 0; i < this.arr.length; i++) {
   if ( this.arr[i].key === key ) {
    this.arr[i].value = value;
    return;
   }
  }
   this.arr[this.arr.length] = new struct(key, value);
 }
 
 var get = function(key) {
  for (var i = 0; i < this.arr.length; i++) {
   if ( this.arr[i].key === key ) {
     return this.arr[i].value;
   }
  }
  return null;
 }
 
 var remove = function(key) {
  var v;
  for (var i = 0; i < this.arr.length; i++) {
   v = this.arr.pop();
   if ( v.key === key ) {
    continue;
   }
   this.arr.unshift(v);
  }
 }
 
 var size = function() {
  return this.arr.length;
 }
 
 var isEmpty = function() {
  return this.arr.length <= 0;
 }
 this.arr = new Array();
 this.get = get;
 this.put = put;
 this.remove = remove;
 this.size = size;
 this.isEmpty = isEmpty;
}

var recom_map = new Map();//key:cls_con;value:是否执行
var tb_digi_scroll_handle = {
    isClass:true,//cls_con是否className
    isInit:false,//是否初始化加载，第一屏的设置true
    scrollHandle: function(cls_con, callback,isClass,isInit) {
        var _this1 = this;
        if(isInit == true){
             
            scrollHandle1(cls_con,callback,isClass)
          
        }
        $(window).bind('scroll resize', function() {
           scrollHandle1(cls_con,callback,isClass)
        })

        return _this1;
    }
}
function scrollHandle1(cls_con, callback,isClass){
	var fuhao = '.';
	if(isClass == false){
		fuhao = '#';	
	}
	var top = $(fuhao + cls_con).offset().top;
	var w_hieght = document.documentElement.clientHeight;
	var s_top = $(window).scrollTop();
	var hasDone = recom_map.get(cls_con);
	if( (w_hieght + s_top) > top && hasDone == null) {
		if (typeof callback === 'function') {
		    recom_map.put(cls_con,"true");
		    callback();
		}
	}
	return true;
}