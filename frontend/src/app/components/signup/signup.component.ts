import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  role = 'buyer';
  message = '';

  constructor(private auth: AuthService) {}

  submit() {
    this.auth.register({ name: this.name, email: this.email, password: this.password, role: this.role }).subscribe({
      next: (res) => (this.message = 'Registered'),
      error: (err) => (this.message = err?.error?.msg || 'Registration failed')
    });
  }
}
