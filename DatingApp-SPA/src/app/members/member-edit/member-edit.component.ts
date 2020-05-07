import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload',['$event'])
  unloadNotification($event:any){
    if (this.editForm.dirty){
      $event.returnValue=true;
    }
  }
  user: User;
  constructor(private route: ActivatedRoute,
    private userService: UserService, private alertify: AlertifyService,private auth:AuthService) { }
  ngOnInit() {
    this.LoadUserData();
  }
  LoadUserData() {
    this.route.data.subscribe(data => {
      console.log(data);
      this.user = data['user'];
    });
  }
  SaveChanges() {
    this.userService.updateUser(this.auth.decodedoken.nameid,this.user).subscribe(res=>{

      this.alertify.success("profile has been updated successfully");
      this.editForm.reset(this.user);
    },error=>{
      this.alertify.error(error);
    });

  }

}
