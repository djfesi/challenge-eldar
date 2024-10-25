import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-data-not-found',
  standalone: true,
  imports: [],
  templateUrl: './data-not-found.component.html',
})
export class DataNotFoundComponent {
  @Input() label: string = 'resultados';
}
