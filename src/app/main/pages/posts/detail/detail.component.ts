import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

import { DataNotFoundComponent } from '../../../../shared/data-not-found/data-not-found.component';
import { SkeletonDetailComponent } from './components/skeleton-detail/skeleton-detail.component';
import { IPost } from '../../../interfaces/data.interface';
import { IUser } from '../../../interfaces/user.interface';
import { PostService } from '../../../services/post.service';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

@Component({
  selector: 'posts-detail',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    DataNotFoundComponent,
    DividerModule,
    PostDetailComponent,
    SkeletonDetailComponent,
  ],
  templateUrl: './detail.component.html',
})
export class DetailComponent {
  public post?: IPost;
  public user?: IUser;
  loading: boolean = false;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const postId = params['id'];
      this.getPostDetails(postId);
    });
  }

  getPostDetails(postId: number): void {
    this.loading = true;
    this.postService.getPostById(postId).subscribe((post) => {
      this.post = post;
      this.fetchUserDetails(post.userId);
    });
  }

  fetchUserDetails(userId: number): void {
    this.userService
      .getUserById(userId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((user) => {
        this.user = user;
      });
  }

  goBack(): void {
    this.router.navigate(['/main/posts/list']);
  }
}
