(function($){
    $.fn.scroll = function(options) {
        var settings = {
            scrollSpeed: 600, //�������ٶ�
            delay: 2000, //��ʱִ�е�ʱ��
            direction: 0, //�����ķ���,0==>���ϣ�1==>����
            showItems: 1, //��ʾ������
            moveItems: 1, //�ƶ��ĺ���
            marquee_btn: 'marquee-btn' //��ť����ʽ����
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
                        
            $(_self).css('height',settings.showItems * _height * -1); //���������ĸ߶�
            $('.' + settings.marquee_btn,_self).css('top',function(index){ return (settings.showItems * _height * -1)/2 - parseInt($(this).height(),10)/2 }); //���㰴ť��Topֵ
                
            if (settings.showItems >= $marqueeUl.children('li').length) return;
                        
            var $marqueeLi = $marqueeUl.append(marqueeUlHtml + marqueeUlHtml).children();
                        
            //�Ƚ����ݶ�λ���ڶ���            
            $marqueeUl.css('top', $marqueeLi.length / 3 * _height);
            
            //��������ʱ��ȡ��������Ϊ���Ƴ���ʱ�򣬼�������
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
            
            //��ʼ����    
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
    			
    			//������ʱ����ѭ��ִ�й���
    			_timer = setTimeout(arguments.callee, settings.delay);
            }
                        
            _timer = setTimeout(start_scroll,settings.delay);
        })
    }
})(jQuery)