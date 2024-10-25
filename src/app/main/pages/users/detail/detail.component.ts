import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CardModule } from 'primeng/card';
import { DataNotFoundComponent } from '../../../../shared/data-not-found/data-not-found.component';
import { IUser } from '../../../interfaces/user.interface';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserService } from '../../../services/user.service';
import { ButtonModule } from 'primeng/button';
import { SkeletonUserDetailComponent } from './components/skeleton-user-detail/skeleton-user-detail.component';

@Component({
  selector: 'users-detail',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    DataNotFoundComponent,
    SkeletonUserDetailComponent,
    UserDetailComponent,
  ],
  templateUrl: './detail.component.html',
})
export class DetailComponent {
  public user?: IUser;
  public loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.loading = true;
      const userId = params['id'];
      this.fetchUserDetails(userId);
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
    this.router.navigate(['/main/users/list']);
  }
}
