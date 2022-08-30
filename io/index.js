let io = ''
module.exports = {
    init: async (io) => {
        io = io
    },
    socket: async (socket) => {
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
        socket.on('disconnect', () => {
            console.log("客户端断开连接");
        })

        socket.on("set name", (name) => {
            // 设置用户名称
            socket.name = name;
            onlineUser[name] = socket.id;
            console.log(onlineUser);
        })

        socket.on('ready message', (blo) => {
            if (blo) {
                io.emit('chat message', {
                    name: socket.name,
                    message: '正在输入'
                });
            } else {
                io.emit('chat message', {
                    name: socket.name,
                    message: '取消输入'
                });
            }
        })

    }
}