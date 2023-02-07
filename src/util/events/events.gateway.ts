import { Injectable } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway(8000, { transports: ['websocket'] })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  connection() {
    this.server.on('connection', (socket) => {
      const req = socket.request;
    });
  }

  sendAlarm(data: any) {
    this.server.to(`${}`).emit('alarm', data);
  }
}
