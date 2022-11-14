import { Component, OnInit } from '@angular/core';
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
  loginUSerData:any={}

  constructor(private _api: ApiCalService,
    private _router:Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  //   if (this._auth.loggedIn()) {
  //     this._router.navigate(['/events'])
  // }
  this._api.emailR.next(this.loginUSerData.email)
  }

  Emailverify(){
     this._api.resetPassword(this.loginUSerData.email).subscribe(
      (res:any)=>{console.log(res),
      this._router.navigate(['/confirmPassword']);
      this.toastr.success(" login Success");
       console.log(this.loginUSerData.email)
        },
      (err)=>{console.log(err)
      this.errormsg = err;
      console.log(this.errormsg);
      this.toastr.error(this.errormsg.error);
      console.log(this.loginUSerData.email)
      }
    )

  }

}
