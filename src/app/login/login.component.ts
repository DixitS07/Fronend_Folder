import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../appServices/auth.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  loginUSerData: any = {};
  loggedUser: any;
  constructor(private _auth: AuthService,
    private _router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this._auth.loggedIn()) {
      this._router.navigate(['/events'])
    }
  }
  loginUSer() {
    this._auth.loggedUser(this.loginUSerData).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/special']);
        this.toastr.success(res.message);
        const tokenInfo = this.getDecodedAccessToken(res.token); // decode token
        const expireDate = tokenInfo.exp;
        this._auth.autologout(new Date(expireDate * 1000).getTime() - new Date().getTime())
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    )
  }


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

}
