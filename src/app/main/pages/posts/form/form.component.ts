import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { IPost } from '../../../interfaces/data.interface';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'post-form',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    DividerModule,
    FormsModule,
    FloatLabelModule,
    InputTextModule,
    ReactiveFormsModule,
    SkeletonModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  public postForm: FormGroup;
  public isEditing: boolean = false;
  public loading: boolean = true;
  public postId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditing = true;
        this.postId = params['id'];
        if (this.postId) this.getPostDetails(this.postId);
      }
    });
  }

  private getPostDetails(postId: number): void {
    this.postService
      .getPostById(postId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (post: IPost) => {
          this.postForm.patchValue(post);
        },
        () => {
          this.toastService.error('Error al cargar la publicación.');
          this.goBack();
        }
      );
  }

  private createPost(post: IPost): void {
    this.postService
      .createPost(post)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => {
          this.toastService.success('Publicación creada correctamente.');
          this.goBack();
        },
        () => {
          this.toastService.error('No se pudo crear la publicación.');
        }
      );
  }

  private updatePost(post: IPost): void {
    this.postService
      .updatePost(this.postId!, post)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => {
          this.toastService.success('Publicación actualizada correctamente.');
          this.goBack();
        },
        () => {
          this.toastService.error('No se pudo actualizar la publicación.');
        }
      );
  }

  public onSubmit(): void {
    if (this.postForm.valid) {
      this.loading = true;
      const post: IPost = this.postForm.value;
      if (this.isEditing && this.postId) {
        this.updatePost(post);
      } else {
        this.createPost(post);
      }
    }
  }

  public goBack(): void {
    this.router.navigate(['/main/posts/list']);
  }
}
