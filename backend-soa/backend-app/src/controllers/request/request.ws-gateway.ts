import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OPEN, Server } from 'ws';

@WebSocketGateway(8080,  { transports: ['websocket'] })
export class RequestWsGateway {
  @WebSocketServer()
  server: Server;

  constructor() {}

  broadcast(data: any): void {
    this.server.emit('message', JSON.stringify(data));
    // this.server.clients.forEach(client => {
    //   if (client.readyState === OPEN) {
    //     client.send(JSON.stringify(data));
    //   }
    // });
  }
}