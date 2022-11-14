import { Component, OnInit } from '@angular/core';
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
    private _router:Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this._api.emailR.subscribe((res)=>{
      this.emailR = res
    })
  
  }

  newPassword(){
    if (this.LoginPassword.Password == this.LoginPassword.ConfirmPassword) {
      console.log('Correct');

      this._api.resetNewPassword(this.emailR).subscribe(
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

