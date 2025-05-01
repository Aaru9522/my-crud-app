import { Component, OnInit } from '@angular/core';
import { UserService, UserDto } from '../../services/user.service';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: UserDto[] = [];

  constructor(private svc: UserService) { }

  ngOnInit(): void {
    this.svc.getAll().subscribe({
      next: data => this.users = data,
      error: err  => console.error(err)
    });
  }
}
