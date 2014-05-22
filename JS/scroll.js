(function($){
    $.fn.scroll = function(options) {
        var settings = {
            scrollSpeed: 600, //滚动的速度
            delay: 2000, //定时执行的时间
            direction: 0, //滚动的方向,0==>向上，1==>向下
            showItems: 1, //显示的行数
            moveItems: 1, //移动的函数
            marquee_btn: 'marquee-btn' //按钮的样式名称
        }
        
        if (options) {
            $.extend(settings,options);
        }
        
        return this.each(function(index) {
            var _timer = null,
                _lock = false,
                _self = this,
                _height = $(_self).height() * -1,         
                $marqueeUl = $(_self).find('ul:first'),
                marqueeUlHtml = $marqueeUl.html();           
                        
            $(_self).css('height',settings.showItems * _height * -1); //重置容器的高度
            $('.' + settings.marquee_btn,_self).css('top',function(index){ return (settings.showItems * _height * -1)/2 - parseInt($(this).height(),10)/2 }); //计算按钮的Top值
                
            if (settings.showItems >= $marqueeUl.children('li').length) return;
                        
            var $marqueeLi = $marqueeUl.append(marqueeUlHtml + marqueeUlHtml).children();
                        
            //先将内容定位到第二组            
            $marqueeUl.css('top', $marqueeLi.length / 3 * _height);
            
            //鼠标移入的时候，取消滚动行为，移出的时候，继续滚动
            $marqueeLi.hover(function(){
                clearTimeout(_timer);
            },function(){
                _timer = setTimeout(start_scroll,settings.delay);
            })
                
            $('.' + settings.marquee_btn,_self).click(function() {
                if (_lock) return;
                clearTimeout(_timer);
                settings.direction = parseInt($(this).attr('data-direction'),10);
                start_scroll();
            })
            
            //开始滚动    
            function start_scroll() {
                _lock = !_lock;
                
                var _now = $marqueeUl.position().top / _height;
    			_now = (settings.direction ? _now - settings.moveItems + $marqueeLi.length : _now + settings.moveItems)  % $marqueeLi.length;
     
    			$marqueeUl.animate({
    				top: _now * _height
    			}, settings.scrollSpeed, function() {    				
    				if(_now + settings.moveItems >= $marqueeLi.length / 3 * 2) {
    					$marqueeUl.css('top', $marqueeLi.length / 3 * _height - _height * ($marqueeLi.length / 3 * 2 - _now));
    				}else if(_now < $marqueeLi.length / 3) {
    					$marqueeUl.css('top', $marqueeLi.length / 3 * _height + (_height* _now));
    				}
    				_lock = !_lock;
    			});
    			
    			//启动计时器，循环执行滚动
    			_timer = setTimeout(arguments.callee, settings.delay);
            }
                        
            _timer = setTimeout(start_scroll,settings.delay);
        })
    }
})(jQuery)