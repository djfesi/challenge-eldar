import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ConfirmDialogModule, CommonModule, ToastModule, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Challenge Angular';
}
