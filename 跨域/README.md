####1. 同域iframe直接用。
比如a.om里面有个id为ifr的iframe，地址也是a.com/iframe.html
直接通过 document.getElemementById('ifr').contentWindow.document
来访问iframe里面的节点或者内容。
iframe.html可以通过top.document或者parent.document来访问主页面里面的内容。


####2.同域但是二级域名(s.a.com)和一级域名(a.com)之间的访问，只需要在两个页面中加入 document.domain="a.com"就可以了。

####3.a.com与b.com之间跨域通信需要一个proxy做代理。可以通过hash或者window.name来处理。

#####3.1通过hash值处理。与a.com里面window.open(b.com/xxx.html)。b.com/xxx.html里面操作将值通过hash赋值给与a.com同域代理iframe的src。然后通过proxy代理页面讲hash值传回给a.com。

#####a.com 1.html
<div id="ebook_id"></div>
	<a href="##" id="btn">打开</a>
	<script type="text/javascript"> 
		var oBtn = document.getElementById('btn');
		
		oBtn.onclick=function(ev){			
			var ev = window.event || event;			
			ev.preventDefault();			
			window.open('http://b.com/itest/iframe.hash/b.com.htm');			
		} 
	
	</script>
 

#####b.com b.com.html
 
    <button id="change">改变</button>
    <script type="text/javascript"> 
    
    	var oChangeBtn = document.getElementById('change');
    	
    	oChangeBtn.onclick = function(){
    	
    		var hash = '{itemid:1111}'
    		var ifr = document.createElement('iframe');	
    		ifr.src = "http://a.com/itest/iframe.hash/a.proxy.html#"+hash;
    		ifr.style.display = 'none';
    		document.body.appendChild(ifr);
    		 
    	}
    	
    </script>
 
####a.com proxy.html

    <script type="text/javascript"> 
             
    window.top.opener.location.hash = self.location.hash;    
    window.top.opener.document.getElementById('btn').style.color = '#888';
    window.top.opener.document.getElementById('ebook_id').innerHTML = self.location.hash.substring(1);
    window.top.close();     
    
    </script>
 
####3.2利用window.name来传值
通过 window.name可以不变的特性来传值。先将数据通过window.name带到window下面再通过同域名的啊proxy文件来访问window.name,移形换位。

a.com a.html 

    var state = 0, 
    iframe = document.createElement('iframe'),
    
	loadfn = function() {

		console.log("state"+state)
        if (state === 1) {
            var data = iframe.contentWindow.name;    // 读取数据			
            window.console && window.console.log(eval("("+data+")"));   
			
        } else if (state === 0) {
            state = 1;			
            iframe.contentWindow.location = "http://a.com/itest/window.name/proxy.html"; // 设置的代理文件
        }  
    };
	
	
	
    iframe.src = 'http://b.com/itest/window.name/data.html';
    
	//iframe.src地址发生变化,重新监听onload事件	
	if (iframe.attachEvent) {
        iframe.attachEvent('onload', loadfn);
    } else {
        iframe.onload  = loadfn;
    }
	
    document.body.appendChild(iframe);




b.com  data.html

    <script type="text/javascript">
	window.name = '{"a":1,"b":2}';
    </script> 
      