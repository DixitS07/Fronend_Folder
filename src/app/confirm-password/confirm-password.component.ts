import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiCalService } from '../appServices/api-cal.service';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent implements OnInit {
  LoginPassword:any={}
  emailR:any;

  constructor(private _api: ApiCalService,
    private _router:Router,private fb:FormBuilder,
    private toastr: ToastrService) { }
    myReactiveForm!:FormGroup;

  ngOnInit(): void {
  
    this.myReactiveForm = this.fb.group({
      'otp':[''],
      'password':[''],
      'ConformPassword':['']
      })
  
  }

  newPassword(){
    // this._api.emailR.subscribe((res)=>{
    //   this.emailR = res
    //   console.log(this.emailR,'dixitemailjj');
    // })
    this.emailR = localStorage.getItem('email')
    if (this.LoginPassword.Password == this.LoginPassword.ConfirmPassword) {
      console.log('Correct');

      this._api.resetNewPassword(this.emailR,this.myReactiveForm.value.otp,{'password':this.myReactiveForm.value.password}).subscribe(
        (res)=>{console.log(res),
         this._router.navigate(['/login']);
         this.toastr.success(" password Success change");
          },
        (err)=>{console.log(err)
        // this.errormsg = err;
        console.log("jdkjdd");
        this.toastr.error("error");
        }
      )
    }
   else{
    console.log('INCorrect');
  } 
 }

}

