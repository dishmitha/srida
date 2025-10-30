import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(private auth: AuthService) {}

  submit() {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.auth.setToken(res.token);
        this.message = 'Logged in';
      },
      error: (err) => (this.message = err?.error?.msg || 'Login failed')
    });
  }
}
