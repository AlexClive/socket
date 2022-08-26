#!/usr/bin/env node
/**
 * 模块依赖
 **/
const app = require("../main");
const http = require("http")
const path = require("path");
const server = require('http').createServer(app.callback());
const io = require("socket.io")(server);
// 用户集合
let onlineUser = {};

//查找id用户
function findUser(name) {
    return onlineUser[name];
}

io.on('connection', (socket) => {
    console.log("客户端连接id", socket.id);
    socket.on('chat message', (msg) => {
        // 进行判断是否含有@符号
        var info = msg.match(/^@(.*) (.*)$/);
        if (info) {
            console.log(info);
            let id = findUser(info[1]);
            io.to(id).emit("chat message", {
                name: socket.name,
                message: info[2],
                private: true
            })
        } else {
            io.emit('chat message', msg);
        }

    })
    socket.on('disconnect', function () {
        console.log("客户端断开连接");
    })

    socket.on("set name", function (name) {
        // 设置用户名称
        socket.name = name;
        onlineUser[name] = socket.id;
        console.log(onlineUser);
    })

    socket.on('ready message',function (blo) {
        if(blo){
            io.emit('chat message', {
                name: socket.name,
                message: '正在输入'
            });
        }else {
            io.emit('chat message', {
                name: socket.name,
                message: '取消输入'
            });
        }
    })

})


const port = normalizePort(process.env.PORT || '3068');


server.listen(port);

server.on("listening", onListening);

function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe:' + addr : 'port:' + addr.port;
    let port = typeof addr === 'string' ? addr : addr.port;
    console.log("start: http://localhost:" + port);
}