import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  animations: [
    trigger('expandFade', [
      state(
        'initial',
        style({
          width: '40%',
        })
      ),
      state(
        'final',
        style({
          width: 'calc(100% - 5rem)',
        })
      ),
      transition('initial => final', animate('500ms ease-out')),
    ]),
  ],
})
export class AuthComponent implements OnDestroy{
  animationState = 'initial';
  private subscription: Subscription = new Subscription();

  expandAndFade() {
    this.animationState = 'final';
  }

  onActivate(componentReference: any) {
    if (componentReference.loginSuccess) {
      const sub = componentReference.loginSuccess.subscribe(() => {
        this.expandAndFade();
      });
      this.subscription.add(sub);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
