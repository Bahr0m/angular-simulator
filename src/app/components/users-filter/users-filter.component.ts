import { Component, DestroyRef, inject, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'users-filter',
  imports: [],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {
  @Output() filterUsers: (filterValue: string) => void = () => {};
  private destroyRef = inject(DestroyRef);
  input = new FormControl('');

  ngOnInit() {
    this.input.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(200), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.filterUsers(value || '');
      });
  }
}
