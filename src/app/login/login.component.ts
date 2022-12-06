import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { loginUserData } from '../appInterfaces/interface';
import { AuthService } from '../appServices/auth.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
 errormsg:any={}
  loginUSerData:any = {};
  constructor(private _auth: AuthService,
              private _router:Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this._auth.loggedIn()) {
      this._router.navigate(['/events'])
  }
  }
  loginUSer(){
    this._auth.loggedUser(this.loginUSerData).subscribe(
      (res:any)=>{
       console.log(res)
       this._auth.getUserName.next(res.uname)
       localStorage.setItem('token',res.token)
       this._router.navigate(['/special']);
       this.toastr.success(" login Success");
       const tokenInfo = this.getDecodedAccessToken(res.token); // decode token
       const expireDate = tokenInfo.exp;
       this._auth.autologout(new Date(expireDate * 1000).getTime() - new Date().getTime())
        },
      (err)=>{console.log(err)
      this.errormsg = err;
      console.log(this.errormsg);
      this.toastr.error(this.errormsg.error);

      }

    )
    // console.log(this.loginUSerData)
  }


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

}
