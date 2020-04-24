import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-Nav',
  templateUrl: './Nav.component.html',
  styleUrls: ['./Nav.component.css']
})
export class NavComponent implements OnInit {
model:any={};
isloggedIn=false;
  constructor(public auth:AuthService,private alertify:AlertifyService) { }

  ngOnInit() {
  }
  login(){
    this.auth.login(this.model).subscribe(next=>{
      this.isloggedIn=true;
      this.alertify.success('successful login');
    }
    ,error=>{
      console.log(error);
    }
    )
  }
  loggedIn(){
   return this.auth.loggedIn();
  }
  logOut(){
    localStorage.removeItem('token');
    this.alertify.message('logged out');
  }

}
