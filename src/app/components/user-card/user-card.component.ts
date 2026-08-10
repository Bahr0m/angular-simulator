import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../services/user/user.type';
import { UppercasePipe } from '../../helpers/pipes/uppercase.pipe';
import { PhonePipe } from '../../helpers/pipes/phone.pipe';
import { BoldDirective } from '../../helpers/directives/bold.directive';

@Component({
  selector: 'user-card',
  imports: [UppercasePipe, PhonePipe,BoldDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input({ required: true }) user!: IUser;
  @Output() remove = new EventEmitter<number>();
}
