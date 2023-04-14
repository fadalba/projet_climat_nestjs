import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tableau-adm',
  templateUrl: './tableau-adm.component.html',
  styleUrls: ['./tableau-adm.component.css'],

})
export class TableauAdmComponent implements OnInit {

  signupError: string | null = null;
  donne: User[]= [];
  pages: number =1;
  searchText:any;
  id: string = ''


  getId: any;
  registerForm!: FormGroup;
  submitted = false;
  tabOn = true;
  formBuilder: any;

  constructor(private builder: FormBuilder, private userService: UserService, private router: Router){
    //naviguer
    this.router.onSameUrlNavigation = 'reload'
    this.router.events.subscribe((data: any) => {
      if(data.id > 1) {
        this.tabOn = true;
      }


    })
  this.registerForm = this.builder.group({
    prenom: ['', [Validators.required, this.noWhitespaceValidator]],
    nom: ['', [Validators.required, this.noWhitespaceValidator]],
    email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],

  });

}

  noWhitespaceValidator(control: FormControl) {
      const isWhitespace = (control.value || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true };
  }

  ngOnInit(): void {
     this.getDonnees()
  }

  getDonnees = () => {


    this.userService.getUsers().subscribe((donne:any) => {
      this.donne = donne.filter((d: any) => d.email != JSON.parse(localStorage.getItem('connectedUser') as unknown as any).email)
    })



  }
/*
  SimpleAlert(){
    Swal.fire(
      'modification reussie!',
      'you cliked the button!',
      'success'
  )
} */

  changeRole = (id: string) => {
    this.userService.changerRole(id).subscribe(()=> {
      this.getDonnees()
    })

 };



 recupereDonne(id: any,prenom: any,nom: any,email: any){
  Swal.fire({
    title: 'Voulez-vous vraiment modifier cet utilisateur?',
    icon: 'warning',
    confirmButtonColor: "#B82010",
    cancelButtonColor: "green" ,
    showCancelButton: true,
    confirmButtonText: 'oui!',
    cancelButtonText: 'Annuler',

  }).then((result) => {
    if(result.isConfirmed){
      this.tabOn = false;
    }
  })
  this.id = id
  this.registerForm.setValue({prenom, nom, email})
}



 onSubmit() {
  this.registerForm.setValue({
    prenom: [''],
    nom: [''],
    email: [''],
  });


 }

 delete(id: string) {

  Swal.fire({
    title: 'Voulez-vous vraiment archiver cet utilisateur?',
    icon: 'warning',
    confirmButtonColor: "#B82010",
    cancelButtonColor: "green" ,
    showCancelButton: true,
    confirmButtonText: 'oui!',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if(result.isConfirmed){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      this.userService.delete(id).subscribe(()=>{
        Toast.fire({
          icon: 'success',
          title: `Archivé avec succés`
        })
        this.getDonnees()
      })
    }
  })

  }

  modifier(){
    if(!this.registerForm.valid){
      return
    }
    const id = this.id
    console.log(this.registerForm.value)
    this.userService.update(id,this.registerForm.value).subscribe(()=> {
      this.getDonnees()

    })
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

    this.userService.update(id,this.registerForm.value).subscribe({
      next: (user) => {

        Toast.fire({
          icon: 'success',
          title: ` modifié avec succés`
        })

        setTimeout(() => {
          this.tabOn = true
        }, 3500)
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


