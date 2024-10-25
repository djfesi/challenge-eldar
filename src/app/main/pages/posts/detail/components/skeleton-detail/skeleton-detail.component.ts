import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'component-skeleton-detail',
  standalone: true,
  imports: [DividerModule, SkeletonModule],
  templateUrl: './skeleton-detail.component.html',
})
export class SkeletonDetailComponent {}
