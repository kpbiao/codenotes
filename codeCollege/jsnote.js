//毫秒差
	//new Date().getTime()-1398390460849
	//	
	function getTimeDuration(ms){
		var sec=min=hour=day=0,dur = {};
		if(ms>0){
		
			sec = (ms/1000).toFixed(2);
			
			if(sec > 60){
				min = Math.floor(sec/60);
				sec = (sec%60).toFixed(2);
			}
			
			if(min > 60){
				hour = Math.floor(min/60);
				min = (min%60).toFixed(2);
			}
			
			if(hour > 24){
				day = Math.floor(hour/24);
				hour = (hour%24).toFixed(2);
			}
			
		}	
		dur.sec = sec;
		dur.min = min;
		dur.hour = hour;
		dur.day = day; 
		return dur; 
	}
	
	
	var d = getTimeDuration(new Date().getTime()-1398390460849);
	console.log(d.day+'天'+d.hour+'天'+d.min+'分'+d.sec)
	
	//ojb.style.width 获取到的是行内样式
	function getStyle(obj, attr){
		if(obj.currentStyle){ //IE
			return obj.currentStyle[attr]
		}else{  //w3c
			return getComputedStyle(obj,false)[attr];
		}
	}