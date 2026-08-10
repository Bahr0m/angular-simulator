import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../services/user/user.type';
import { BoldDirective } from '../../helpers/directives/bold.directive';

@Component({
  selector: 'user-create',
  imports: [ReactiveFormsModule, BoldDirective],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  @Output() addUser: EventEmitter<IUser> = new EventEmitter<IUser>();
  private fb: FormBuilder = inject(FormBuilder);
  createUserForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
    website: ['', [Validators.maxLength(100)]],
    address: this.fb.group({
      city: ['', [Validators.required, Validators.maxLength(50)]],
      street: ['', [Validators.required, Validators.maxLength(100)]],
      suite: this.fb.control('', [Validators.maxLength(50)]),
      zipcode: this.fb.control('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ]),
      geo: this.fb.group({
        lat: this.fb.control('', [Validators.required, Validators.maxLength(20)]),
        lng: this.fb.control('', [Validators.required, Validators.maxLength(20)]),
      }),
    }),
    company: this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
      catchPhrase: this.fb.control('', [Validators.maxLength(200)]),
      bs: this.fb.control('', [Validators.maxLength(100)]),
    }),
  });

  onSubmit() {
    if (this.createUserForm.valid) {
      const newUser = { ...(this.createUserForm.value as IUser), id: Date.now() };
      this.addUser.emit(newUser);
      this.createUserForm.reset();
    } else {
      console.log('Форма содержит ошибки. Пожалуйста, исправьте их перед отправкой.');
    }
  }
}
