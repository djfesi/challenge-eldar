import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { SplitButtonModule } from 'primeng/splitbutton';

import { Observable } from 'rxjs';

import { AuthService } from '../../auth/services/auth.service';
import { selectUserEmail } from '../../store/auth/auth.selectors';

@Component({
  selector: 'shared-topbar-profile',
  standalone: true,
  imports: [AvatarModule, CommonModule, SplitButtonModule],
  templateUrl: './topbar-profile.component.html',
  styleUrl: './topbar-profile.component.scss',
})
export class TopbarProfileComponent implements OnInit {
  public menuItems?: MenuItem[];
  private userEmail$: Observable<string | null>;
  public email: string | null = null;

  constructor(private authService: AuthService, private store: Store) {
    this.userEmail$ = this.store.select(selectUserEmail);
    this.userEmail$.subscribe((email) => {
      this.email = email;
    });
  }

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }

  logout() {
    this.authService.logout();
  }
}
