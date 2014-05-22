//20110728   hansheng   �����˵�
/*�������½ṹ�Ķ�����ʹ��
<�ܱ�ǩ>
    <��ǩ>text</��ǩ>
	<��ǩ>btn</��ǩ>
    <ul>
        <li><a href="#">����1</a></li>
        <li><a href="#">����2</a></li>
    </ul>
</�ܱ�ǩ>
*/
(function($){
	$.fn.th_select = function(options, fun)
	{
		var defaults = {
			node_downBtn 	:$(this).find('*').eq(1),	//������ť
			node_text		:$(this).find('*').eq(0),	//��ʾ�ı�
			time			:2000						//��ʾ����ʱ��
		};
		var opts = $.extend(defaults, options);
		
		var node_downBtn = opts.node_downBtn;			//������ť
		var node_text = opts.node_text;					//��ʾ�ı�
		var time = opts.time;							//��ʾ����ʱ��
		
		var _this = $(this);							
		
		var node_a = _this.find('a');					//a��ǩ��	
		var node_ul = _this.find('ul');					//ul��ǩ     ���ز���
		var node_li = _this.find('li');					//li��ǩ��
		
		var timer = 0;
		
		initEvent();
		
		function initEvent()
		{	//���IE6���˲���
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