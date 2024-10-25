import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { IUser } from '../../../../../interfaces/user.interface';

@Component({
  selector: 'component-user-detail',
  standalone: true,
  imports: [CommonModule, DividerModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  @Input() user?: IUser;
}
