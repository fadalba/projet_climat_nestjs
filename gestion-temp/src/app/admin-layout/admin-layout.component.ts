import { Component } from '@angular/core';


import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  pageUrl: string = ''
  token: string = '';
  constructor(private router:Router){
    this.token = localStorage.getItem('access_token') as unknown as string;
    this.router.events.subscribe((event: any) => {
      this.pageUrl = this.router.routerState.snapshot.url;
    })
  }
ngOnInit():void{ }
}
