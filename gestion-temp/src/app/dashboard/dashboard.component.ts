import { Component, OnInit } from '@angular/core';
import profils from '../profil.json';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';


export interface DONNE {
  NOM: string;
  PRENOM: string;
  matricule: string,

}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  histo: any = [];
  tableauhis: any = [];
  profil: DONNE[] = profils;
  climatRealtime: {temperature: string,  humidity: string} = {temperature: '--',  humidity: '--'}
  manuel: boolean = false
  refreshed: boolean = false

  constructor(private socketService:SocketService, private router:Router){}

  ngOnInit(): void {
   /*  if (!this.refreshed && this.climatRealtime.temperature == '--') {

    } */
    this.socketService.onSocketConnected().subscribe((data: any) => {
      //console.log(data);
      this.climatRealtime = data


      /* if (this.climatRealtime.temperature >= "30"){
        this.onsrc = 'assets/on.png';
        this.messageText = 'ON';
        this.imageSrc = 'assets/fan2.gif';
      } else {
        if (!this.manuel) {
        this.offsrc = 'assets/off.png';
        this.messageText = 'OFF';
        this.imageSrc = 'assets/fan.png';

      }
     } */
    })
    this.socketService.getTodayClimat().subscribe((data:any) => {
        data['8h'].Heure = '8h';
        data['12h'].Heure = '12h';
        data['19h'].Heure = '19h';
        data['8h'].img = 'assets/sun-cloud.png';
        data['12h'].img = 'assets/sun.png';
        data['19h'].img = 'assets/moon-cloud.png';
        this.histo[0] = data['8h']
        this.histo[1] = data['12h']
        this.histo[2] = data['19h']
    })

    this.socketService.getHistory().subscribe((data: any) => {
      data.forEach((climat:any) => {
        const historDay = climat.date.split('/')[0];
        const historMonth = climat.date.split('/')[1];
        const historYear = climat.date.split('/')[2];
        const historDate = `${historYear}-${historMonth}-${historDay}`;
        const date = new Date(historDate);
        const dayOfWeek = date.getDay();
        //console.log(climat.moyenne, dayOfWeek);

        this.tableauhis.push(climat.moyenne)
      });
      //console.log(data);

    })
  }


  imageSrc = 'assets/fan.png';
  messageText = '';
  offsrc = 'assets/off.png'
  onsrc = 'assets/on.png'

  imageButtonOff = [{ src: 'assets/fan.png', name: 'OFF', srcs:'assets/on.png',srcr : 'assets/off.png' }]
  imageButtonOn = [ { src: 'assets/fan2.gif', name: 'ON', srcr : 'assets/off.png',srcs : 'assets/on.png'}]


  onClick(imageNameObject: { src: string; name: string; srcs: string; srcr: string; }) {
    this.manuel = true
    this.imageSrc = imageNameObject.src;
    this.onsrc = imageNameObject.srcs;
    this.offsrc = imageNameObject.srcr;
    this.messageText = imageNameObject.name;

    if (imageNameObject.name === "ON") {
      this.socketService.turFanOn().subscribe((data) => {
        console.log(data);
      })
    }
    if (imageNameObject.name === "OFF") {
    this.socketService.turFanOff().subscribe((data) => {
      console.log(data);
    })
  }
  }

}
