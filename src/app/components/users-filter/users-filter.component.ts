import { Component, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnChanges {
  input = new FormControl('');

  ngOnChanges() {
    this.input.valueChanges.subscribe((value) => {
      distinctUntilChanged();
      debounceTime(200);
      this.filterUsers(value);
    });
  }
}
