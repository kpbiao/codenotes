/**
 * postMessage�࣬���ڿ�������Ϣ
 *ĳЩҳ���ϣ�FORM ����һ������ iframe �ύ���������������£�����޸��˸� iframe �� window.name ֵ���� FORM ���Ҳ�����Ӧ��Ŀ�꣬�Ӷ������´��ڡ�
 */
function Message(target) {
    var self = this,
        isStart = false,//�Ƿ��Ѿ�������Ϣ�����ˣ�ֻ����name����ʱ��
        DELAY = 50;//window.name�����
 
    this.callbackList = [];
    this.msgList = [];
 
    /**
     * ���log
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
     * ����Ϣ������ȡ��Ϣ����
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
     * ������Ϣ��ָ����window����contentWindow
     * @param target [DOM] ���͵�Ŀ��
     * @param data [String] ��Ϣ���ģ�������2M��
     */
    this.send = function(data){
         self.log('+ ' + document.domain + ' send :' + data);
        //���targetû����ô����˵������window����iframe contentWindow���˴����жϣ����Լ�ǿ
        //if(!target.name) return;
 
        if (window.postMessage) {
            target.postMessage(data, '*');
        }else{
            //���Ͷ����Ϣʱ�����ȴ���Ϣ����
            //alert(document.domain + ': set target name = ' + data);
            self.msgList.push({
                'target': target,
                'data': data
            });
        }
    };
    /**
     * ���¼������������յ���Ϣ�󴥷��ص�����
     * @param callback [Function] ����Ϊdata
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
     * ɾ��ָ���ļ���
     */		
    this.detach = function(fn){
        //�����ָ��fn���Ƴ�ȫ��
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