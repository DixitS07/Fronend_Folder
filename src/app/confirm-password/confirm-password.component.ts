import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiCalService } from '../appServices/api-cal.service';
import { AuthService } from '../appServices/auth.service';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent implements OnInit {
  LoginPassword:any={}
  emailRe:any;
  errormsg:any={}

  constructor(private _api: ApiCalService,
    private _auth:AuthService,
    private _router:Router,private fb:FormBuilder,
    private toastr: ToastrService) { }
    myReactiveForm!:FormGroup;

  ngOnInit(): void {

    if (this._auth.loggedIn()) {
      this._router.navigate(['/events'])
  }
    // this._api.emailR.subscribe(res=>{
    //   this.emailRe = res;
    //   console.log(res,this.emailRe,'emailget');
    // })
 
    this.myReactiveForm = this.fb.group({
      'otp':[''],
      'password':[''],
      'confrimPassword':['']
      })
  
  }

  newPassword(){
    if (this.LoginPassword.Password == this.LoginPassword.confrimPassword) {
      console.log('Correct');
      var x = localStorage.getItem("email");
      this._api.resetNewPassword(x,this.myReactiveForm.value.otp,{'password':this.myReactiveForm.value.password}).subscribe(
        (res)=>{console.log(res),
          this._router.navigate(['/login']);
          this.toastr.success(" password Successfully changed");
        },(err)=>{console.log(err)
        this.errormsg = err;
        console.log("jdkjdd");
        this.toastr.error("Password not changed");
        }
        
      )
    }
   else{
    console.log('INCorrect');
    this.toastr.success("Password ans ConfirmPassword not matched");
  } 
 }

}

