import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { DataNotFoundComponent } from '../../../../shared/data-not-found/data-not-found.component';
import { PostService } from '../../../services/post.service';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  Subject,
} from 'rxjs';
import { IPost } from '../../../interfaces/data.interface';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserRole } from '../../../../store/auth/auth.selectors';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'posts-list',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    CardModule,
    DataNotFoundComponent,
    PaginatorModule,
    SkeletonModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListPostsComponent {
  public posts: IPost[] = [];
  public loading: boolean = false;
  public userRole?: string | null;

  public totalRecords: number = 0;
  public first: number = 0;
  public itemsPerPage: number = 10;
  private searchSubject = new Subject<string>();
  public searchTerm: string = '';

  constructor(
    private postService: PostService,
    private router: Router,
    private store: Store,
    private toastService: ToastService
  ) {
    this.store.select(selectUserRole).subscribe((role) => {
      this.userRole = role;
    });
  }

  ngOnInit(): void {
    this.getPosts();
    this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.searchTerm = searchTerm;
        this.getPosts();
      });
  }

  private getPosts(page: number = 1): void {
    this.loading = true;
    this.posts = [];

    this.postService
      .getPosts(page, this.itemsPerPage, this.searchTerm)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.posts = response;
          this.totalRecords = 100;
        },
        error: (err) => {
          this.posts = [];
        },
      });
  }

  public onPageChange(event: any): void {
    this.first = event.first;
    const page = event.page + 1;
    this.getPosts(page);
  }

  public onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchSubject.next(target.value);
  }

  public newPost() {
    this.router.navigate(['./main/posts/new']);
  }

  public onDetailPost(postId: number): void {
    this.router.navigate(['./main/posts', postId]);
  }

  public onUpdatePost(postId: number): void {
    this.router.navigate(['./main/posts/update', postId]);
  }

  public onDeletePost(postId: number): void {
    this.postService.deletePost(postId).subscribe(
      () => {
        this.toastService.success('Publicación eliminada correctamente.');
        this.getPosts();
      },
      () => {
        this.toastService.error('No se pudo eliminar la publicación');
      }
    );
  }
}
