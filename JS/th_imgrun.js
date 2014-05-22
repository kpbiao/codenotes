//20110728   kpbiao   旋转木马，图片轮播效果
(function($){
	$.fn.th_hs_imgrun = function(options)
	{
		var defaults = {
			time		:3000,		//轮换秒数
            index		:0,			//默认第几张		
			speed		:"slow",		//切换时间
		};
		var opts = $.extend(defaults, options);
		
		var _index = opts.index;
		var _time = opts.time;
		var _speed = opts.speed;
		
		var _this = $(this);
		
		var _node_li = $(this).find("li");
		var _li_arr = [];
		
		for(var i=0; i<=2; i++) {
			var _object = {"width":_node_li.eq(i).find('img').width(), "height":_node_li.eq(i).find('img').height(), "top":_node_li.eq(i).css("top"), "left":_node_li.eq(i).css("left")};
			_li_arr.push(_object);
		}
		
		var _timer = setInterval(show, _time);
		
		function show() {
			_index + 1>2 ? _index=0 : _index++;
			
			var index = _index;
			var h;
			if(_index == 0) {_node_li.eq(0).css("z-index",5); h = _li_arr[_index].height + 30;}
			if(_index == 2) {_node_li.eq(0).css("z-index",1); h = _li_arr[_index].height;}
			if(_index == 1) {_node_li.eq(0).css("z-index",3); h = _li_arr[_index].height;}
			_node_li.eq(0).stop(true,true).animate({"left": _li_arr[_index].left, "top": _li_arr[_index].top, "width": _li_arr[_index].width, "height": h}, _speed);
			_node_li.eq(0).find("img").stop(true,true).animate({"width": _li_arr[_index].width, "height":_li_arr[_index].height}, _speed);

			
			_index + 1>2 ? _index=0 : _index++;
			if(_index == 0) {_node_li.eq(1).css("z-index",5); h = _li_arr[_index].height + 30;}
			if(_index == 2) {_node_li.eq(1).css("z-index",1); h = _li_arr[_index].height;}
			if(_index == 1) {_node_li.eq(1).css("z-index",3); h = _li_arr[_index].height;}
			_node_li.eq(1).stop(true,true).animate({"left": _li_arr[_index].left, "top": _li_arr[_index].top, "width": _li_arr[_index].width, "height": h}, _speed);
			_node_li.eq(1).find("img").stop(true,true).animate({"width": _li_arr[_index].width, "height":_li_arr[_index].height}, _speed);
			
			_index + 1>2 ? _index=0 : _index++;
			if(_index == 0) {_node_li.eq(2).css("z-index",5); h = _li_arr[_index].height + 30;}
			if(_index == 2) {_node_li.eq(2).css("z-index",1); h = _li_arr[_index].height;}
			if(_index == 1) {_node_li.eq(2).css("z-index",3); h = _li_arr[_index].height;}
			_node_li.eq(2).stop(true,true).animate({"left": _li_arr[_index].left, "top": _li_arr[_index].top, "width": _li_arr[_index].width, "height": h}, _speed);
			_node_li.eq(2).find("img").stop(true,true).animate({"width": _li_arr[_index].width, "height":_li_arr[_index].height}, _speed);
			
			
			_index = index;	
		}
	}
})(jQuery);
