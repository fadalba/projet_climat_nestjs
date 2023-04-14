import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model'

@Pipe({
  name: 'searchInactif'
})
export class SearchInactifPipe implements PipeTransform {

  transform(allUsers: User[], searchTerm: string): User[] {
    searchTerm = searchTerm.toLowerCase()
    return allUsers.filter(user => user.etat == 0 &&
       (user.nom.toLowerCase().includes(searchTerm) || user.prenom.toLowerCase().includes(searchTerm)
        || user.email.toLowerCase().includes(searchTerm))
      );
  }

}
