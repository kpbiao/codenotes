//20110728   hansheng   下拉菜单
/*符合以下结构的都可以使用
<总标签>
    <标签>text</标签>
	<标签>btn</标签>
    <ul>
        <li><a href="#">内容1</a></li>
        <li><a href="#">内容2</a></li>
    </ul>
</总标签>
*/
(function($){
	$.fn.th_select = function(options, fun)
	{
		var defaults = {
			node_downBtn 	:$(this).find('*').eq(1),	//下拉按钮
			node_text		:$(this).find('*').eq(0),	//显示文本
			time			:2000						//显示动画时间
		};
		var opts = $.extend(defaults, options);
		
		var node_downBtn = opts.node_downBtn;			//下拉按钮
		var node_text = opts.node_text;					//显示文本
		var time = opts.time;							//显示动画时间
		
		var _this = $(this);							
		
		var node_a = _this.find('a');					//a标签集	
		var node_ul = _this.find('ul');					//ul标签     隐藏部分
		var node_li = _this.find('li');					//li标签集
		
		var timer = 0;
		
		initEvent();
		
		function initEvent()
		{	//解决IE6档了测试
			/*node_a.each(
				function()
				{
					var space = "                          ";
					$(this).text($(this).text() + space).css({overflow: "hidden", whiteSpace: "nowrap"}); 
				}
			);*/
			node_downBtn.click(
				 function($e)
				 {
				 	$e.preventDefault();
					_this.find('ul').css('display') == "block" ? _this.find('ul').fadeOut('normal') : _this.find('ul').fadeIn('normal');
					
					//$('.ser_select').css('display') == "block" ? $('.ser_select').slideToggle('fast') : $('.ser_select').slideToggle('fast');
				 }
			);
			node_li.click(
				function($e)
				{
					$e.preventDefault();
					node_text.text($(this).text());
					node_ul.fadeOut('normal');
                    if (typeof fun !== 'undefined') {
					    fun($(this).text());
                    }
				}
			);
			node_ul.add(node_downBtn).mouseout(
				function()
				{
					if(node_ul.css('display') == "block")
					{
						timer = setTimeout(
							function(){
								node_ul.fadeOut('normal')
							}
							,time
						);
					}
				}
			).mouseover(
				function()
				{
					clearTimeout(timer);
				}
			);
		}
	}
})(jQuery);