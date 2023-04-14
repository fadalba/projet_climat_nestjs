import { Component } from '@angular/core';
import profils from '../profil.json';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
interface DONNE{
  NOM: string;
PRENOM: string;

}


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    isAdmin: boolean = false;
    constructor(private authService: AuthService, private userService: UserService, private router: Router) {
      //recupération du profile de l'utilisateur
      this.authService.profile().subscribe({
        next: (user: any) => {
          console.log(user);
          //Vérifier si l'utilisateur est un admin
          this.isAdmin = user.role === 'admin' ? true : false;
        },
        error: (err)=> {
          console.log(err);
        },
        complete: () => {
          console.log("complete");
        }
      })
      if (!this.isAdmin){
        this.router.navigateByUrl('/dashboard');
      }
    }
}
