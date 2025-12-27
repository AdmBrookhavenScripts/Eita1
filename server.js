import WebSocket, { WebSocketServer } from "ws";

const PORT = process.env.PORT || 3000;

const wss = new WebSocketServer({ port: PORT });

const clients = new Set();

wss.on("connection", ws => {
    clients.add(ws);

    ws.on("message", data => {
        for (const client of clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data.toString());
            }
        }
    });

    ws.on("close", () => {
        clients.delete(ws);
    });
});

console.log("WebSocket online na porta", PORT);
