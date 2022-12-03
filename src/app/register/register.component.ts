import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
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
  user!:SocialUser
  constructor(private _auth: AuthService, 
              private _router: Router,
              private authService: SocialAuthService) { }

  ngOnInit(): void {
    
    
    
  //   if (this._auth.loggedIn()) {
  //     this._router.navigate(['/events'])
  // }
  }
  
  registerUSer(){
    this._auth.registeredUser(this.registerUSerData).subscribe(
      (res:any)=>{
      this._auth.userId.next(res.uname)
      console.log(res)
      localStorage.setItem('token', res.token) 
      this._router.navigate(['/special']).then()
      },
      (err)=>console.log(err)
    )
  }

  ongoogleSigin():void{
    this.authService.authState.subscribe((user)=>{
      this.user = user;
      localStorage.setItem('token', user.idToken)
      this._router.navigate(['/special'])
      console.log(this.user);
    })

    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
    //   (user:any)=>{
    //     localStorage.setItem('token', user.idToken)
    //     this._router.navigate(['/special'])
    //       },
    //       (err:any)=>{
    //         console.log(err);
    //       }
    //     )
  }

  onfacebookLogin(){
    this._auth.FbLogin().subscribe(
    (res:any)=>{
      console.log(res,'response form fb node')
      localStorage.setItem('token', res.token)
      this._router.navigate(['/special']).then()
    },
    (err)=>console.log(err)
    )
  }

}
