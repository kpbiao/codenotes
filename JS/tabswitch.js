(function($){
    $.fn.tabswitch = function(options) {        
        var settings = {
            event: 'mouseover', //事件类型
            delay: 100, //切换tab的延迟时间,单位毫秒 
            tabClass: 'tab-head', //tab样式，用于tab查找    
            currClass: 'curr', //当前tab应用的样式
            contentClass: 'tab-content', //tab对应的内容样式，用于元素查找
			callback: null
        }
        
        if (options) {
            $.extend(settings,options);
        }
        
        var elems = this,
			callback = settings.callback;
        
        function _tabswitch(index,item,currClass) {
            var jObj = item;
            
            jObj.addClass(currClass).siblings('li').removeClass(currClass);
            
            var currTabContent = $('.' + settings.contentClass,elems).eq(index),
                    script = currTabContent.find('>script[type="text/templ"]');
                                
            if (script.length > 0) {                
                currTabContent[0].innerHTML = script.html();
            }
            
            currTabContent.fadeIn().siblings('.' + settings.contentClass).hide('fast');
			
			if (callback && typeof callback === 'function') {				
				callback();
			}
        }
        
        $('.' + settings.tabClass + ' li',elems).each(function(index) { 			
            var jObj = $(this),
                timeid = null,          
                currClass = settings.currClass;                    
            jObj.bind(settings.event,function() {				
                if(settings.event === 'mouseover') {
                    timeid = setTimeout(function(){						
                        _tabswitch(index,jObj,currClass);
                    },settings.delay);
                }
                else {
                    _tabswitch(index,jObj,currClass);
                }
            });
            
            if (settings.event === 'mouseover') {				
                jObj.bind('mouseout',function(){
                    if (typeof timeid !== 'undefined') {
                        clearTimeout(timeid);
                    }
                })                
            }            
        })
    }
})(jQuery)