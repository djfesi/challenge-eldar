import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { MenuOption } from '../../main/interfaces/manuItem.interface';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private allMenuOptions: MenuOption[] = [
    {
      icon: 'pi pi-home',
      label: 'Dashboard',
      route: './',
      roles: [],
    },
    {
      icon: 'pi pi-folder',
      label: 'Publicaciones',
      route: './posts/list',
      roles: [],
    },
    {
      icon: 'pi pi-users',
      label: 'Usuarios',
      route: './users/list',
      roles: [],
    },
  ];

  constructor(private authService: AuthService) {}

  getMenuOptions(): MenuOption[] {
    const role = this.authService.getDataToken('role');

    if (role) {
      return this.allMenuOptions.filter(
        (option) => option.roles.length === 0 || option.roles.includes(role)
      );
    } else {
      return this.allMenuOptions.filter((option) => option.roles.length === 0);
    }
  }
}
