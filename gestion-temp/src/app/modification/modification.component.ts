import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import modifier from '../modifie.json';
import { UserService } from '../services/user.service';


interface modification{
  
}

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.css']
})
export class ModificationComponent {

  profil!: any;
  registerForm!:FormGroup;
  title = 'angularvalidate';
  submitted = false;
  spin=false;
  showForm = false; 
  user: any;
  findAll:any;
signupError: any;
  
  constructor(private formBuilder: FormBuilder, private userService: UserService){
       this.registerForm = this.formBuilder.group({
        id:[''],
        prenom: ['', Validators.required],
        nom: ['', [Validators.required]],
        email:['',[Validators.required,Validators.email]],
        

      })

     
    
} 

/* noWhitespaceValidator(control: FormControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
} */
onSubmit(){

}

ngOnInit(): void {



/*   this.registerForm = this.formBuilder.group({
    prenom: ['', [Validators.required, this.noWhitespaceValidator]],
    nom: ['', [Validators.required, this.noWhitespaceValidator]],
    email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],

  }); */
  this.profil = JSON.parse(localStorage.getItem('connectedUser') as unknown as any);

  this.userService.getUsers().subscribe(
    data => {

      this.user = data;

      this.findAll = this.user.filter((e: any) => e.etat == true)
      console.log(this.findAll)
    }
  );
  

}

  
}

  






