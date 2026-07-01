import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../sevices/loader/loader.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'loader',
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  private loaderService: LoaderService = inject(LoaderService);
  loader$: Observable<boolean> = this.loaderService.loader$;
}
