// socketIoService.ts
import { Server, Socket } from 'socket.io';
import http from 'http';

class SocketIoService {
  private io: Server;

  constructor(server: http.Server) {
    this.io = new Server(server);
    this.initializeSocketEvents();
  }

  initializeSocketEvents() {
    this.io.on('connection', (socket: Socket) => {
      console.log('A user connected');

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  }

  emitToAll(eventName: string, data: any) {
    this.io.emit(eventName, data);
  }
}

export default SocketIoService;
