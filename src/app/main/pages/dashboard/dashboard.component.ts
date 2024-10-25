import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardWelcomeComponent } from './components/card-welcome/card-welcome.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardWelcomeComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
