import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, finalize, Subject } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

import { selectUserRole } from '../../../../store/auth/auth.selectors';
import { DataNotFoundComponent } from '../../../../shared/data-not-found/data-not-found.component';
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../interfaces/user.interface';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'users-list',
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
export class ListUserComponent {
  public users: IUser[] = [];
  public userRole?: string | null;

  public loading: boolean = false;
  private searchSubject = new Subject<string>();
  public searchTerm: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store,
    private toastService: ToastService
  ) {
    this.store.select(selectUserRole).subscribe((role) => {
      this.userRole = role;
    });
  }

  ngOnInit(): void {
    this.getUsers();
    this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.searchTerm = searchTerm;
        this.getUsers();
      });
  }

  private getUsers(): void {
    this.loading = true;
    this.users = [];

    this.userService
      .getUsers(this.searchTerm)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.users = response;
        },
        error: () => {
          this.users = [];
        },
      });
  }

  public onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchSubject.next(target.value);
  }

  public onDetailUser(userId: number): void {
    this.router.navigate(['./main/users', userId]);
  }

  public onDeleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.users = this.users.filter(user => user.id !== userId);
        this.toastService.success('Usuario eliminado correctamente.');
      },
      () => {
        this.toastService.error('No se pudo eliminar el usuario');
      }
    );
  }
}
