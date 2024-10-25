import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router, RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { CustomFormModule } from '../../../shared/module/customForms.module';
import { ToastService } from '../../../main/services/toast.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [CustomFormModule, RouterModule, PasswordModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('fadeOut', [
      transition(':leave', [animate('500ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<void>();
  public loginForm: FormGroup;
  public fadeOut: boolean = false;
  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.animationLogin();
        },
        error: () => {
          this.loading = false;
          this.toastService.error('Usuario y/o contraseña incorrecta');
        },
      });
    }
  }

  private animationLogin(): void {
    this.fadeOut = true;
    this.loginSuccess.emit();
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/main']);
    }, 500);
  }
}
