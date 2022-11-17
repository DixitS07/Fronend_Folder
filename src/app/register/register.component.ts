import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../appServices/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUSerData:any={}
  constructor(private _auth: AuthService, 
              private _router: Router,
              private authService: SocialAuthService) { }

  ngOnInit(): void {
    if (this._auth.loggedIn()) {
      this._router.navigate(['/events'])
  }
  }
  
  registerUSer(){
    this._auth.registeredUser(this.registerUSerData).subscribe(
      (res:any)=>{console.log(res)
      localStorage.setItem('token', res.token)
      this._router.navigate(['/special'])
      },
      (err)=>console.log(err)
    )
  }

  ongoogleSigin(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (user)=>{
        this._auth.googleSignin(user.idToken).subscribe(
          (res)=>{
            console.log(res);
          },
          (err)=>{
            console.log(err);
          }
        )
    })
  }

}
