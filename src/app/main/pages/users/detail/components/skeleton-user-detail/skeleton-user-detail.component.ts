import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'component-skeleton-user-detail',
  standalone: true,
  imports: [DividerModule, SkeletonModule],
  templateUrl: './skeleton-user-detail.component.html',
})
export class SkeletonUserDetailComponent {}
