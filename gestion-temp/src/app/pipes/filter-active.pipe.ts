import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model'

@Pipe({
  name: 'filterActive'
})
export class FilterActivePipe implements PipeTransform {

  transform(allUsers: User[]): User[] {
    return allUsers.filter(user => user.etat == 1 && user.matricule != localStorage.getItem('matricule'));
  }

}
