import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private authUrl='https://localhost:44300/api/auth/';
constructor(private http:HttpClient ) { }
login(model:any){
  return this.http.post(this.authUrl+'login',model)
  .pipe(
    map((res:any)=>{
      let user=res;
      if (user){
      localStorage.setItem('token',user.token);
      }
    }));
}
register(model:any){
  return this.http.post(this.authUrl+'register',model);
}
}
