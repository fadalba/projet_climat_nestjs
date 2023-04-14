import { Component,  OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import liste from '../modele/liste.json';


interface donneeliste{

  prenom:string;
  nom:string;
  email:string;
  matricule:string;
  role:string;
  id:string;
}
@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent implements OnInit {

  getId: any;
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    public formBuilder: FormBuilder,
   
  ) {

    this.registerForm = this.formBuilder.group({
        prenom: ['',],
        nom: [''],
        email: [''],
      });
 } donne:donneeliste[]= [];

ngOnInit(): void {
  
  this.getDonnees()
}

getDonnees = () => {
  this.donne = liste
}
get f() { return this.registerForm.controls; }

 onSubmit() {
  this.registerForm.setValue({
    prenom: [''],
    nom: [''],
    email: [''],
  });
 }
 

}
