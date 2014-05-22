/**
 * postMessage类，用于跨域传输消息
 *某些页面上，FORM 表单向一个隐藏 iframe 提交的情况，这种情况下，如果修改了该 iframe 的 window.name 值，则 FORM 将找不到对应的目标，从而将打开新窗口。
 */
function Message(target) {
    var self = this,
        isStart = false,//是否已经启动消息发送了（只用于name传递时）
        DELAY = 50;//window.name检测间隔
 
    this.callbackList = [];
    this.msgList = [];
 
    /**
     * 输出log
     */
    this.log = function(msg, cat, src){
        if (location && (location.search || '').indexOf('cd-debug') !== -1){
            if (src) {
                msg = src + ': ' + msg;
            }
            if (window['console'] !== undefined && console.log) {
                console[cat && console[cat] ? cat : 'log'](msg);
            }
        }
    }
 
    /**
     * 从消息队列中取消息发送
     */
    this._fireSend = function(){
        if(isStart) return;
 
        isStart = true;
        var msg,
            timer;
        timer = setInterval(function(){
            if(self.msgList.length == 0){
                return;
            }
 
            msg = self.msgList.shift();
            msg.target.name = msg.data;
 
        }, DELAY);
    }
    /**
     * 发送消息到指定的window或者contentWindow
     * @param target [DOM] 发送的目标
     * @param data [String] 消息正文（不超过2M）
     */
    this.send = function(data){
         self.log('+ ' + document.domain + ' send :' + data);
        //如果target没有那么属性说明不是window或者iframe contentWindow，此处简单判断，可以加强
        //if(!target.name) return;
 
        if (window.postMessage) {
            target.postMessage(data, '*');
        }else{
            //发送多个消息时候必须等待消息传递
            //alert(document.domain + ': set target name = ' + data);
            self.msgList.push({
                'target': target,
                'data': data
            });
        }
    };
    /**
     * 绑定事件监听，到接收到消息后触发回调函数
     * @param callback [Function] 参数为data
     */
    this.on = function(callback){
        if(typeof callback !== 'function') return;
        this.callbackList.push(callback);
    };
    this._trigger = function(data){
        self.log('+ ' + document.domain + ' recived :' + data);
        for(var i = this.callbackList.length; i > 0; i--){
            //alert(document.domain + ':' + data);
            this.callbackList[i-1].call(window,data);
        }
        self.log('+ ' + document.domain + ' recived : end');
    };
    /**
     * 删除指定的监听
     */		
    this.detach = function(fn){
        //如果不指定fn，移除全部
        if(typeof(fn) == 'undefined'){
            self.callbackList = [];
            return;
        }else if(typeof(fn) == 'function'){
            for(var i = 0; i < self.callbackList.length; i++){
                if(fn == self.callbackList[i]){
                    self.callbackList.splice(i, 1);
                }
            }
        }
 
    }
 
    if (window.postMessage) {
        if (window.addEventListener) {
            window.addEventListener("message", function(e) {
                    self._trigger(e.data);
                }, false);
        } else if (window.attachEvent) {
            window.attachEvent("onmessage", function(e) {
                    self._trigger(e.data);
                });
        }
    } else {
        var hash = window.name = 'used by postmsg';
 
        setInterval(function() {
            if (window.name !== hash) {
                //alert(document.domain + ': name changed from ' + hash + 'to ' + window.name);
                hash = window.name;
                var tmp = hash;
                hash = window.name = 'used by postmsg';
                self._trigger(tmp);
            }
        },
        DELAY);
    }			
    self._fireSend();
}