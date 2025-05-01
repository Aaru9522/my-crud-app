import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';  // ← add these
import { AuthService } from '../../services/auth.service';
import { Router }      from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']   // ← styleUrls (plural), not styleUrl
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // initialize your form here so fb is defined
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const { username, password } = this.form.value;
    this.auth.login(username!, password!)
      .subscribe({
        next: () => this.router.navigate(['/user']),
        error: () => console.error('Login failed')
      });
  }
}
