import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IUser } from '../../services/user/user.type';
import { UppercasePipe } from '../../helpers/pipes/uppercase.pipe';
import { PhonePipe } from '../../helpers/pipes/phone.pipe';
import { BoldDirective } from '../../helpers/directives/bold.directive';
import { AnimateDirective } from '../../helpers/directives/animate.directive';

@Component({
  selector: 'user-card',
  imports: [UppercasePipe,ButtonModule,PhonePipe,BoldDirective,AnimateDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input({ required: true }) user!: IUser;
  @Output() remove = new EventEmitter<number>();
}
