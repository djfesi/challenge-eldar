import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardModule } from 'primeng/card';
import { Observable } from 'rxjs';
import { selectUserRole } from '../../../../../store/auth/auth.selectors';

@Component({
  selector: 'component-card-welcome',
  standalone: true,
  imports: [CardModule, CommonModule],
  templateUrl: './card-welcome.component.html',
})
export class CardWelcomeComponent {
  userRole$: Observable<string | null>;

  constructor(private store: Store) {
    this.userRole$ = this.store.select(selectUserRole);
  }

  public setRoleMessage(role: string): string {
    switch (role) {
      case 'admin':
        return 'Tu rol es de administrador. Puedes acceder a la información, editar, eliminar, y crear publicaciones, además de gestionar otros recursos.';
      case 'user':
        return 'Tu rol es de usuario. Solo tienes permisos para visualizar la información.';
      default:
        return 'Rol no especificado';
    }
  }
}
