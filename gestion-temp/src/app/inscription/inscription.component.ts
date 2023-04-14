import { Component } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent  {
  signupError: string | null = null;

  constructor(private builder: FormBuilder, private userService: UserService){}
  profileForm = this.builder.group({
    firstName: ['', [Validators.required, this.noWhitespaceValidator]],
    lastName: ['', [Validators.required, this.noWhitespaceValidator]],
    Email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    Role: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
    Confirm: new FormControl('', Validators.required),
  }, {
    validators: [this.MustMatch('Password', 'Confirm'), this.handleRole('Role')],
  });

  ngOnInit(): void {}

  handleRole(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName]
      if (control.errors && !control.errors.hasRole) {
        return;
      }
      if (control.value != 'admin' && control.value != 'utilisateur') {
        control.setErrors({ hasRole: true })
      } else {
        control.setErrors(null)
      }
    }
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
  //Validation des espaces
  noWhitespaceValidator(control: FormControl) {
      const isWhitespace = (control.value || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true };
  }

  //Enregistrement de l'utilisateur
  register() {
    if(this.profileForm.invalid) return;
    const data = {
      nom: this.profileForm.value.firstName,
      prenom: this.profileForm.value.lastName,
      email: this.profileForm.value.Email,
      role: this.profileForm.value.Role,
      password: this.profileForm.value.Password
    }
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    //Inscription de l'utilisateur
    this.userService.register(data).subscribe({
      next: (user) => {
        Toast.fire({
          icon: 'success',
          title: `${user.prenom + ' ' + user.nom} a été inscris avec succés`
        })
      },
      error: (err) => {
        this.signupError = err.error.message
        setTimeout(() => {
          this.signupError = null;
        }, 5000)
      },
      complete: () => console.log("complete")
    })
  }

}
