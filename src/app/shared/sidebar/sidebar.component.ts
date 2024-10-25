import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { MenuOption } from '../../main/interfaces/manuItem.interface';
import { MenuService } from '../../main/services/menu.service';


@Component({
  selector: 'shared-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  public selectedTheme?: 'dark' | 'light';
  public menuOptions?: MenuOption[];

  constructor(
    private cd: ChangeDetectorRef,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.setMenuOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes &&
      changes['items']?.currentValue &&
      changes['items'].currentValue.length > 1 &&
      changes['items'].currentValue[1]?.badge !== 0
    ) {
      this.cd.markForCheck();
    }
  }

  private setMenuOptions(): void {
    this.menuOptions = this.menuService.getMenuOptions();
  }
}
