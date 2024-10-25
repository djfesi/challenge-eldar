import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { TopbarComponent } from '../shared/topbar/topbar.component';

@Component({
  selector: 'main',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SidebarComponent,
    TopbarComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  ngOnInit(): void {
    console.log(
      '%cChallenge desarrollado por: Silva Federico\nTeléfono: 3413076564\nContacto: fesi_93@hotmail.com',
      'color: grey; font-size:16px;'
    );
  }
}
