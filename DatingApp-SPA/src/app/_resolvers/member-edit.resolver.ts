import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { User } from "../_models/user";
import { AlertifyService } from "../_services/alertify.service";
import { UserService } from "../_services/user.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../_services/auth.service";

@Injectable()
export class MemberEditResolver implements Resolve<User>{

constructor(private userService:UserService,private alertify:AlertifyService,private authServ :AuthService,
    private router:Router) {}
     
    resolve(route:ActivatedRouteSnapshot): Observable<User>{
        
return this.userService.getUser(+this.authServ.decodedoken.nameid).pipe(
    catchError(error=>{
        this.alertify.error('error while retrieving your data');
        this.router.navigate(['/members']);
        return of(null);
    })
)
    }
}