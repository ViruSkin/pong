import { serve, type Server, type ServerWebSocket } from "bun";

interface WebSocketHandlers {
  open(ws: ServerWebSocket): void;
  message(ws: ServerWebSocket, message: string | Buffer): void;
  close(ws: ServerWebSocket): void;
  error(ws: ServerWebSocket, error: Error): void;
}

const wss: WebSocketHandlers = {
  open(ws) {
    ws.send("Hello from server!");
  },
  message(ws, message) {
    ws.send(`pong`);
  },
  close(ws) {},
  error(ws, error) {},
};

serve({
  async fetch(req: Request, server: Server) {
    const url = new URL(req.url);
    if (url.pathname === "/websocket" && server.upgrade(req)) {
      return;
    }
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
    console.log(req.headers);
    return new Response("pong", { status: 200, headers });
  },
  websocket: wss,
  port: 2024,
});
