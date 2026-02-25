// WebSocket init
const websocket = new require("ws")
const wss = new websocket.Server({ port: 3000 })

// Говорим, что сервер запущён
console.log("Сервер запущен");

// Обробатываем подключения
wss.on('connection', (ws) => {
	console.log("Кто-то подключился");

	ws.on('message', message => {
		message = message.toString()
		wss.clients.forEach(client => {
			if (client.readyState === websocket.OPEN) {
				client.send(message)
			}
		});
	})
})