import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model'

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allUsers: User[], searchTerm: string): User[] {
    searchTerm = searchTerm.toLowerCase()

    let users = []

    const _users = allUsers.filter(user => user.etat == 1 &&
       (user.nom.toLowerCase().includes(searchTerm) || user.prenom.toLowerCase().includes(searchTerm)
        || user.email.toLowerCase().includes(searchTerm))
      );
      for(let i = 0; i <3;i++) {
        if(_users[i]) {
          users[i] = _users[i]
        }
      }
      return users;
  }

}
