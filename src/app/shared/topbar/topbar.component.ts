import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

import { MenubarModule } from 'primeng/menubar';

import { MenuOption } from '../../main/interfaces/manuItem.interface';
import { MenuService } from '../../main/services/menu.service';
import { TopbarProfileComponent } from '../topbar-profile/topbar-profile.component';

@Component({
  selector: 'shared-topbar',
  standalone: true,
  imports: [CommonModule, MenubarModule, TopbarProfileComponent],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  public menuOptions?: MenuOption[];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.checkViewport();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkViewport();
  }
  public isMobile: boolean = false;

  private checkViewport() {
    this.isMobile = window.innerWidth <= 750;
    if (this.isMobile) this.setMenuOptions();
  }

  private setMenuOptions(): void {
    this.menuOptions = this.menuService.getMenuOptions();
  }

  public redirect() {
    window.open('https://www.eldars.com.ar/', '_blank');
  }
}
