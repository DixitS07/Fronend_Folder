import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiCalService } from '../appServices/api-cal.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  errormsg:any={}

  constructor(private _api: ApiCalService,
    private _router:Router,
    private toastr: ToastrService,private fb:FormBuilder) { }

    myReactiveForm!:FormGroup;

  ngOnInit(): void {
  //   if (this._auth.loggedIn()) {
  //     this._router.navigate(['/events'])
  // }
 
  this.myReactiveForm = this.fb.group({
    'email':['',[Validators.email,Validators.required]]
    })
  
  }

  Emailverify(){
    console.log(this.myReactiveForm.value.email,'dixitrrrrrr')
    localStorage.setItem('email',this.myReactiveForm.value.email)
    // this._api.emailR.next(this.myReactiveForm.value.email)
     this._api.resetPassword(this.myReactiveForm.value).subscribe(
      (err)=>{
        console.log(err)
        this.errormsg = err;
        console.log(this.errormsg);
        this.toastr.error(this.errormsg.error);
        // console.log(this.myReactiveForm.value)
        },
      (res)=>{console.log(res),
      this._router.navigate(['/confirmPassword']);
      this.toastr.success(" Email Verify");
      
      //  console.log(this.myReactiveForm.value)
        }
    )

  }

}
