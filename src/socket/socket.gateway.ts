import { Logger, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(3001, { cors: {orgin: '*'}, namespace: 'alarm' }) 
export class SocketGateway {
  //OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('SocketGateway');

//   @SubscribeMessage('ClientToServer')
// connectMessage(@MessageBody() data: boolean) {
//     this.logger.log(data);
//     this.server.emit('connectMessage', data);
//   }

  @SubscribeMessage('alarm')
  alarmEvent(data: {}){
    console.log('소켓으로 보는 데이터:', data)
    this.server.emit('alarm', data);
    
  }
}
