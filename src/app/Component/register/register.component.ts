import { Component, OnInit }            from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService }                  from '../../services/auth.service';
import { Router }                       from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const { username, email, password } = this.form.value;
    this.auth.register(username, email, password).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => console.error(err)
    });
  }
}
