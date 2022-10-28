import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 errormsg:any={}
  loginUSerData:any={}
  constructor(private _auth: AuthService,
              private _router:Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  loginUSer(){
    this._auth.loginUser(this.loginUSerData).subscribe(
      (res:any)=>{console.log(res),
       localStorage.setItem('token',res.token)
       this._router.navigate(['/special']);
       this.toastr.success(" login Success");
        },
      (err)=>{console.log(err)
      this.errormsg = err;
      console.log(this.errormsg);
      this.toastr.error(this.errormsg.error);

      }

    )
    // console.log(this.loginUSerData)
  }

}
