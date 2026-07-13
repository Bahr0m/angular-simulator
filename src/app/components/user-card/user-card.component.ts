import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../services/user/user.type';

@Component({
  selector: 'user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input({ required: true }) user!: IUser;
  @Output() remove = new EventEmitter<number>();
}
