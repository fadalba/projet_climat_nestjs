import { Component, OnInit } from '@angular/core';
import liste from '../modele/liste.json';

interface donneeliste {
  prenom:string;
  nom:string;
  email:string;
  role:string;
  matricule:string;
  id:string;
  datedinscription:string; 
  

}

@Component({
  selector: 'app-tableau-user',
  templateUrl: './tableau-user.component.html',
  styleUrls: ['./tableau-user.component.css']
})
export class TableauUserComponent implements OnInit {

  pages: number = 1;
  searchText:any
  constructor() {}
    donne:donneeliste[]= [];

  ngOnInit(): void {
    
     this.getDonnees()

  }

  getDonnees = () => {
    this.donne = liste
  }


}
