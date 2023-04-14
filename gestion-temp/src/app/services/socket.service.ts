import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket, private httpClient: HttpClient) { }

  onSocketConnected() {
    this.socket.emit('connection', 'connected')
    /* this.socket.on('connection', (socket: Socket) => {
      console.log("connection established");

    }) */
		return this.socket.fromEvent('connection');
	}

  getTodayClimat() {
    return this.httpClient.get('http://localhost:3001/climat/');
  }

  getHistory() {
    return this.httpClient.get('http://localhost:3001/climat/histo');
  }

  turFanOn() {
    this.socket.emit('fanOn', '1');
    return this.socket.fromEvent('fanStarted');
  }

  turFanOff() {
    this.socket.emit('fanOff', '0');
    return this.socket.fromEvent('fanStopped');
  }
}
