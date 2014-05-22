(function (window) {
    /**  
    ������汾��Ϣ
    * @type {Object} 
    * @return {Boolean}  ���ز���ֵ     
    */
    var browser = function () {
        var u = navigator.userAgent.toLowerCase();
        var app = navigator.appVersion.toLowerCase();
        return {
            txt: u, // ������汾��Ϣ
            
			version: (u.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], // �汾��       
            
			msie: /msie/.test(u) && !/opera/.test(u), // IE�ں�
            
			mozilla: /mozilla/.test(u) && !/(compatible|webkit)/.test(u), // ��������
            
			safari: /safari/.test(u) && !/chrome/.test(u), //�Ƿ�Ϊsafair
            
			chrome: /chrome/.test(u), //�Ƿ�Ϊchrome
            
			opera: /opera/.test(u), //�Ƿ�Ϊoprea
            
			presto: u.indexOf('presto/') > -1, //opera�ں�
			
            webKit: u.indexOf('applewebkit/') > -1, //ƻ�����ȸ��ں�
			
            gecko: u.indexOf('gecko/') > -1 && u.indexOf('khtml') == -1, //����ں�
			
            mobile: !!u.match(/applewebkit.*mobile.*/), //�Ƿ�Ϊ�ƶ��ն�
			
            ios: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/), //ios�ն�
			
            android: u.indexOf('android') > -1, //android�ն�
			
            iPhone: u.indexOf('iphone') > -1, //�Ƿ�ΪiPhone
			
            iPad: u.indexOf('ipad') > -1, //�Ƿ�iPad
			
            webApp: !!u.match(/applewebkit.*mobile.*/) && u.indexOf('safari/') == -1, //�Ƿ�webӦ�ó���û��ͷ����ײ�
			
            fixed: !!u.match(/applewebkit.*mobile.*/) && (u.match(/\(i[^;]+;( u;)? cpu.+mac os x/) ? 5 > /\d/ig.exec(/os\s\d/ig.exec(u) + "") ? !1 : !0 : 3 > parseFloat(/\d.\d/ig.exec(/android\s\d.\d/ig.exec(u))) ? !1 : !0) //�Ƿ�֧��fixed
        };
    }()
    window.browser = browser;
})(window)