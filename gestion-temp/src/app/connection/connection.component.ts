import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent {
  loginError: string | null = null;
  constructor(private builder: FormBuilder, private authService: AuthService, private router: Router, private userService: UserService){}

  profileForm = this.builder.group({
    email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: new FormControl('', Validators.required),
  });

  //Connexion de l'utilisateur
  onSubmit() {
    //Vérifier si il y'a des erreur
    if(!this.profileForm.valid) {
      return;
    }
    //Appeler le service pour envoyer les données
    this.authService.login(this.profileForm.value).subscribe({
      //Si la connexion est réussie cette fonction s'exécute
      next: (response) => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('email', response.email);
        this.router.navigateByUrl('/dashboard');
      },
      //S'il y a une erreur lors de la connexion cette fonction s'exécute
      error: (err) => {
        this.loginError = err.error.message
        setTimeout(() => {
          this.loginError = null;
        }, 5000)
      },
      //Si la connexion est reussie et que la fonction next fini de s'executer cette fonction s'execute
      complete: () => console.log('complete')
    })
  }

}
