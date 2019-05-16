import { AuthenticationService } from '../authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { PostDataService } from '../../post-data.service';

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value
    ? null
    : { passwordsDiffer: true };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: FormGroup;
  public errorMsg: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private postService: PostDataService
  ) {}

  ngOnInit() {
    this.user = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authService
      .login(this.user.value.username, this.user.value.password)
      .subscribe(
        val => {
          if (val) {
            if (this.authService.redirectUrl) {
              this.router.navigateByUrl(this.authService.redirectUrl);
              this.authService.redirectUrl = undefined;
           
            } else {
              this.router.navigate(['/post-list']);
            }
          } else {
            this.errorMsg = `Could not login`;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.error instanceof Error) {
            this.errorMsg = `Error while trying to login user ${
              this.user.value.username
            }: ${err.error.message}`;
          } else {
            this.errorMsg = `Error ${err.status} while trying to login user ${
              this.user.value.username
            }: ${err.error}`;
          }
        }
      );
     
      
  }
}


/*import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';

import { RouterModule, Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

 // private _user: User;
  constructor(private router: Router) {

   }

  
 

  loginUser(event){
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;


  /*  this.serv.getUserDetails(username, password)
    .subscribe(data => {
      console.log(data, "is wat we got");
      this.currentUserServ.pasUserAan(data)
      this._user=data;
      if(this._user != null){
        this.router.navigate(['/post-list']);
      }
      console.log("in userserv is user nu:");
      console.log(this.currentUserServ.user);

     
   
    });
   
  }
}
*/