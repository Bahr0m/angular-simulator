import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {
  @Output() filterUsers: EventEmitter<string> = new EventEmitter<string>();
  private destroyRef = inject(DestroyRef);
  search = new FormControl('');

  ngOnInit() {
    this.search.valueChanges
      .pipe( debounceTime(200),distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.filterUsers.emit(value || '');
      });
  }
}
