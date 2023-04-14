import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListeComponent implements OnInit {
  @Input() donnes!: User;
  @Input() delete!: Function
  @Input() recupereDonne!: Function
  @Input() changeRole!: Function
  @Input() pages!: number
  @ViewChild('liste') liste!: TemplateRef<any>

  constructor () {}

  /* ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (changes['donnes']) {
      this.donnes = changes['donnes'].currentValue
    }
   } */

   ngOnInit(): void {}

}
