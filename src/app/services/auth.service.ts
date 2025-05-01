import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { tap }          from 'rxjs/operators';
import { environment }  from '../../environments/environment';

interface LoginResp    { token: string; }
interface RegisterResp { id: number; username: string; email: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${environment.APIURL}/auth`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post<LoginResp>(`${this.base}/login`, { username, password })
      .pipe(tap(res => {
        localStorage.setItem('Token', res.token);
      }));
  }

  register(username: string, email: string, password: string) {
    return this.http.post<RegisterResp>(`${this.base}/register`, {
      username, email, password
    });
  }

  logout() {
    localStorage.removeItem('Token');
  }
}
