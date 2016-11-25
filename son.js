var num = 0;

process.on('message', function(m, server) {
	if (m === 'server') {
		server.on('connection', function(socket) {
			console.log('handled by child  ', ++num);
			socket.end('handled by child');
		});
	}
});