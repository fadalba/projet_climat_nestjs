import { Component, OnInit,NgZone} from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';/* 
import liste from '../modele/liste.json'; */
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';


interface donneeliste{

  prenom:string;
  nom:string;
  email:string;
  matricule:string;
  role:string;
  id:string;

}
@Component({
  selector: 'app-tableau-arch',
  templateUrl: './tableau-arch.component.html',
  styleUrls: ['./tableau-arch.component.css']
})
export class TableauArchComponent implements OnInit{
  pages: number = 1;
  searchText:any
  getId: any;
  donne:User[]= [];

  updateForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private ngZone: NgZone,
    private userService: UserService

    ) {
      this.updateForm = this.formBuilder.group({
        etat: [true]
      });
    }

  ngOnInit(): void {

    this.getDonnees()
  }

  getDonnees = () => {
    this.userService.getUsersArchive().subscribe((users: User[]) => {
      this.donne = users;
    });
}
restaurer = ( id: string)  => {

  this.userService.restaure(id).subscribe(()=>{
    this.getDonnees()
  })
 
};
}
