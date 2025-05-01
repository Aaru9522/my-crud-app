import { Component, OnInit }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router }             from '@angular/router';

import { AuthService }  from '../../services/auth.service';
import { UserService }  from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  isEdit = false;    // <-- are we editing an existing user?
  userId!: number;   // <-- holds the id when editing

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private userSvc: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // 1) build the form
    this.form = this.fb.group({
      username: ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // 2) check for /register/:id
    this.userId = Number(this.route.snapshot.params['id']);
    if (this.userId) {
      this.isEdit = true;
      // 3) load existing user
      this.userSvc.getById(this.userId).subscribe(user => {
        this.form.patchValue({
          username: user.username,
          email:    user.email,
          // leave password blank on edit
        });
        // make password optional when editing
        this.form.get('password')?.clearValidators();
        this.form.get('password')?.updateValueAndValidity();
      });
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const { username, email, password } = this.form.value;

    if (this.isEdit) {
      // UPDATE existing user
      this.userSvc
        .update(this.userId, { username, email })
        .subscribe({
          next: () => this.router.navigate(['/user']),
          error: err => console.error('Update failed', err)
        });
    } else {
      // CREATE new user via AuthService.register
      this.auth
        .register(username, email, password)
        .subscribe({
          next: () => this.router.navigate(['/login']),
          error: err => console.error('Registration failed', err)
        });
    }
  }
}
