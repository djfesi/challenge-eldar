import { Component, Input } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { IUser } from '../../../../../interfaces/user.interface';
import { IPost } from '../../../../../interfaces/data.interface';

@Component({
  selector: 'component-post-detail',
  standalone: true,
  imports: [DividerModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent {
  @Input() post?: IPost;
  @Input() user?: IUser;
}
