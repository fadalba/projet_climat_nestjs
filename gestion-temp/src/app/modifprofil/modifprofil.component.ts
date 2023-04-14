import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-modifprofil',
  templateUrl: './modifprofil.component.html',
  styleUrls: ['./modifprofil.component.css']
})
export class ModifprofilComponent {
  profil!: any;
  registerForm!:FormGroup;
  title = 'angularvalidate';
  submitted = false;
  spin=false;
  showFormPass= false
  showForm = false;
  user: any;
  findAll:any;
  signupError: any;
  id: any;
  verifPass: any;
  FormBuilder: any;
  passwordForm!: FormGroup;



constructor(private builder: FormBuilder, private userService: UserService , private router : Router){
  const url = this.router.routerState.snapshot.url;
  console.log(url=== 'modifpassword');

  if (url === '/modifpassword'){
    this.showFormPass = true
  }
  this.registerForm = this.builder.group({
    prenom: ['', [Validators.required, this.noWhitespaceValidator]],
    nom: ['', [Validators.required, this.noWhitespaceValidator]],
    email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],

  });

  this.passwordForm = this.builder.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    confirmNewPassword: ['', [Validators.required]],
  }, {
    validators: [this.MustMatch('newPassword', 'confirmNewPassword')],
  });

}

   //ici j'exporte la class MushMatch pour la gestion de mes mots de passes
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            //renvoie si un autre validateur a déjà trouvé une erreur sur le matchingControl
            return;
        }

        //définir une erreur sur matchingControl si la validation échoue
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }
//controle espacement
noWhitespaceValidator(control: FormControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}


//recuperation donnees
ngOnInit(): void {
//Cette ligne de code tente de récupérer une valeur stockée dans
//le stockage local avec la clé "connectedUser" et de l'analyser en tant qu'objet JSON.
//Le résultat est alors affecté à une propriété nommée "profil".
    this.profil = JSON.parse(localStorage.getItem('connectedUser') as unknown as any);

   //recuperation donnees
    this.registerForm.setValue({nom: this.profil.nom, prenom: this.profil.prenom, email: this.profil.email})


  }

  modifUsers (){
    //recuperation id sur le profil
    const id = this.profil._id;

    //recuperation des données du formulaire
    const user = {
      nom: this.registerForm.value.nom,
    prenom: this.registerForm.value.prenom,
    email: this.registerForm.value.email
    }

    //creation du Toast
    const Toast = Swal.mixin({
      toast: true,
      position: 'center-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    //Appel du service pour la modification
  this.userService.modifUsers(id,user).subscribe(
  {
    //Fonction qui s'execute en cas de réussite
    next: (data) => {
      if (data.modifiedCount === 1) {
        Toast.fire({
          icon: 'success',
          title: `${user.prenom + ' ' + user.nom} a été modifié avec succés`
        })
        setTimeout(()=>{
          this.showForm= true
          this.router.navigateByUrl('/dashboard')
        }, 3000 )
      }
    },
    //Fonction qui s'exécute en cas d'erreur
    error: (error) => {
      console.log(error);

    }
  }
  );
  }

  modifpassword(){

    const id = this.profil._id;
    const user = {
      ancienPassword: this.passwordForm.value.oldPassword,
      newPassword: this.passwordForm.value.newPassword
    }
    console.log(user)

    //creation du Toast
    const Toast = Swal.mixin({
      toast: true,
      position: 'center-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })


    this.userService.modifPassword(id,user).subscribe(
      {
        //Fonction qui s'execute en cas de réussite
        next: (data) => {
          if (data.modifiedCount === 1) {
            Toast.fire({
              icon: 'success',
              title: `Mot de passe modifié avec succés`
            })
            setTimeout(()=>{
              this.showForm= true
              this.router.navigateByUrl('/dashboard')
            }, 3000 )
          }
        },
        //Fonction qui s'exécute en cas d'erreur
        error: (error) => {
          this.signupError = error.error.message;

        }
      }
    );
  }
}
