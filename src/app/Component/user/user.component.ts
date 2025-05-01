import { Component, OnInit } from '@angular/core';
import { UserService, UserDto } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: UserDto[] = [];

  constructor(
    private svc: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  // 1) Fetch (or re‐fetch) all users
  loadUsers(): void {
    this.svc.getAll().subscribe({
      next: data => this.users = data,
      error: err  => console.error('Failed to load users', err)
    });
  }

  // 2) Navigate to the "create" form
  newUser(): void {
    this.router.navigate(['/register']);
  }

  // 3) Navigate to the "edit" form with the user ID
  editUser(id: number): void {
    this.router.navigate(['/register', id]);
  }

  // 4) Delete, then reload the list
  deleteUser(id: number): void {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }
    this.svc.delete(id).subscribe({
      next: () => this.loadUsers(),
      error: err  => console.error('Delete failed', err)
    });
  }
}
