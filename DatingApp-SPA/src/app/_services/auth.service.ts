import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'https://localhost:44300/api/auth/';

  jwtHelper = new JwtHelperService();
  decodedoken: any;
  constructor(private http: HttpClient) { }
  login(model: any) {
    return this.http.post(this.authUrl + 'login', model)
      .pipe(
        map((res: any) => {
          let user = res;
          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedoken=this.jwtHelper.decodeToken(user.token);
          }
        }));
  }
  register(model: any) {
    return this.http.post(this.authUrl + 'register', model);
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
