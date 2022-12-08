import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCalService } from '../appServices/api-cal.service';
import { AuthService } from '../appServices/auth.service';
import jwt_decode from 'jwt-decode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loader: boolean = false;
  form!: FormGroup;
  registerUSerData:any={}
  user!:SocialUser
  fileToUpload: any = null;

  constructor(private _auth: AuthService, 
              private _apical:ApiCalService,
              private _router: Router,
              private authService: SocialAuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService) { 
              }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      profilPic: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]],
      otp: ['', [Validators.required,]]
    })

    }

  
  sendOtp(email:any){
    console.log(email.value)
    this._auth.otpVerify(email.value).subscribe(
      (res:any)=>{
        this.toastr.success(res.message)
      },
      (err:any)=>{
        this.toastr.error(err.message)
      }
    )
  }

  // registerUSer(){
  //   this._auth.registeredUser(this.registerUSerData).subscribe(
  //     (res:any)=>{
  //       console.log(res)
  //     this._auth.getUserName.next(res.uname)
  //     localStorage.setItem('token', res.token) 
  //     this._router.navigate(['/special']).then()
  //     const tokenInfo = this.getDecodedAccessToken(res.token); // decode token
  //     const expireDate = tokenInfo.exp;
  //     this._auth.autologout(new Date(expireDate * 1000).getTime() - new Date().getTime())
  //   }, (err) => {
  //     console.log(err)
  //     }
  //   )
  // }

  save() {
    this.loader = true;
    const formData: FormData = new FormData();
    formData.append('firstName', this.form.value.firstName)
    formData.append('lastName', this.form.value.lastName)
    formData.append('email', this.form.value.email)
    formData.append('password', this.form.value.password)
    formData.append('profilPic', this.fileToUpload, this.fileToUpload.name)
    formData.append('otp', this.form.value.otp)
    this._auth.registeredUser(this.registerUSerData).subscribe(
      (data:any)=>{
      this.toastr.success(data.message)
      this.loader = false;
      localStorage.setItem('token', data.token)
      this.router.navigate(['/dashboard'])
      const tokenInfo = this.getDecodedAccessToken(data.token); // decode token
      const expireDate = tokenInfo.exp;
      this._auth.autologout(new Date(expireDate * 1000).getTime() - new Date().getTime())
    }, (err) => {
      this.loader = false
      this.toastr.error(err.error.message)
    })
  }
  
 
  getDecodedAccessToken(token: string): any {
    try {return jwt_decode(token);
        } catch (Error) { return null;
        }
    }


}





 // ongoogleSigin():void{
  //   this.authService.authState.subscribe((user)=>{
  //     this.user = user;
  //     localStorage.setItem('token', user.idToken)
  //     this._router.navigate(['/special'])
  //     console.log(this.user);
  //   })

  //   // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
  //   //   (user:any)=>{
  //   //     localStorage.setItem('token', user.idToken)
  //   //     this._router.navigate(['/special'])
  //   //       },
  //   //       (err:any)=>{
  //   //         console.log(err);
  //   //       }
  //   //     )
  // }

  // onfacebookLogin(){
  //   this._auth.FbLogin().subscribe(
  //   (res:any)=>{
  //     console.log(res,'response form fb node')
  //     localStorage.setItem('token', res.token)
  //     this._router.navigate(['/special']).then()
  //   },
  //   (err)=>console.log(err)
  //   )
  // }
