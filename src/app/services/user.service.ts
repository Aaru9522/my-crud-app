import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { Observable }  from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserDto {
  id: number;
  username: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private base = `${environment.APIURL}/users`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.base);
  }
  // getById, create, update, delete as needed...
}
