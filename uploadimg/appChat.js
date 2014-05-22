/**
 * Module dependencies.
 */

var express = require('express')
    //, routes = require('./routes')  
    //, user = require('./routes/user') 
    , gid = require('guid')
    , http = require('http')
    , path = require('path');

//var app = express();

// all environments
//app.set('port', process.env.PORT || 3001);
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
//app.use(express.methodOverride());
//app.use(express.cookieParser('ks'));
//app.use(express.session());
//app.use(express.static(path.join(__dirname, 'public')));

// development only
//if ('development' == app.get('env'))
//    app.use(express.errorHandler());

//app.configure(function(){
//    app.set('port', process.env.PORT || 3001);
//    app.use(express.bodyParser());
//    app.use(express.methodOverride());
//    app.use(express.cookieParser('ks'));
//    app.use(express.session());
//});


//var server = http.createServer(app).listen(app.get('port'), function () {
//    console.log('Express server listening on port ' + app.get('port'));
//});

var server = http.createServer(function (req, res) {
    console.log('Express server listening on port 8002');
}).listen(8002, "115.28.20.152");

var io = require('socket.io').listen(server);


// IO.Socket 监测
io.sockets.on('connection', function (socket) {
    var roomId = '';    // 定义当前socket的roomId
    console.log('新增一个连接数，最新连接数：'+GetJsonLength(io.sockets.manager.connected));
    //console.log('最新配对数：'+GetJsonLength(io.sockets.manager.connected));

    socket.on('disconnect', function() {
        console.log('失去一个连接数，最新连接数：'+(GetJsonLength(io.sockets.manager.connected)-1));
    })

    // 创建room监听函数
    // 获取当前socket.id，并设置为roomId
    socket.on('createRoom', function (data, callback) {
        socket.join(socket.id);
        // 设置当前通信roomId
        roomId = socket.id;

        // 回调
        if (typeof(callback) == 'function')
            callback(roomId);
    });

    // 加入指定room
    // 返回是否加入成功
    socket.on('joinRoom', function (rId, callback) {
        var result = false; //定义返回结果
        // 如果存在指定room，则加入，并设置当前roomId
        if (io.sockets.clients(rId)){
            socket.join(rId);
            roomId=rId;
            result = true;
        }
        // 回调
        if (typeof(callback) == 'function')
            callback(result);
    });

    // 退出当前room
    socket.on('leaveRoom', function (data, callback) {
        // 如果当前roomId不为空，则执行退出
        if (roomId != '') {
            socket.leave(roomId);
            roomId = '';
        }

        // 回调
        if (typeof(callback) == 'function')
            callback();
    });

    // 发送指令
    // 将指令发送至所属room的其他客户端
    socket.on('sendOrder', function (data, callback) {
        var result = false;
        // 如果当前roomId不为空则查找
        if(roomId != ''){
            //io.sockets.in(roomId).emit('getOrder', data);
            // 获取当前room所有客户端
            var roomClients = io.sockets.clients(roomId);
            // 给除了自身之外的所有客户端发送 getOrder 消息，参数为 sendOrder 的 data
            for(var i=0;i<roomClients.length;i++){
                if(roomClients[i].id!=socket.id)
                    roomClients[i].emit('getOrder', data);
            }

            result = true;
        }
        // 回调
        if (typeof(callback) == 'function')
            callback(result);
    });
});

// 获取json对象长度
function GetJsonLength(jsonData){
    var jsonLength = 0;
    for(var item in jsonData){
        jsonLength++;
    }
    return jsonLength;
}