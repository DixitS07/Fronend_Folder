import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCalService } from '../appServices/api-cal.service';
import { AuthService } from '../appServices/auth.service';
import jwt_decode from 'jwt-decode';
import { FormBuilder, FormGroup,FormControl ,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Myenable: boolean = true;
  form!: FormGroup;
  loader: boolean = false;
  myReactiveForm!: FormGroup;
  registerUSerData:any={}
  user!:SocialUser
  fileToUpload!:File;
  constructor(private _auth: AuthService, 
              private _apical:ApiCalService,
              private _router: Router,
              private authService: SocialAuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService) { 
              }

  ngOnInit(): void {
    this.myReactiveForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      photo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]],
      otp: ['', [Validators.required,]]
    })

    }
    getFile(event:any){
      // this.fileToUpload = event.target.files[0]
      this.fileToUpload = event.target.files.item(0)
    }
  
  sendOtp(email:any){
    this.Myenable = false;
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
 
<<<<<<< HEAD
  // registerUSer(){
  //   this._auth.registeredUser(this.registerUSerData).subscribe(
  //     (res:any)=>{
  //       console.log(res)
  //     this._auth.getUserName.next(res.uname)
  //     localStorage.setItem('token', res.token) 
  //     
  //     const tokenInfo = this.getDecodedAccessToken(res.token); // decode token
  //     const expireDate = tokenInfo.exp;
  //     this._auth.autologout(new Date(expireDate * 1000).getTime() - new Date().getTime())
  //   }, (err) => {
  //     console.log(err)
  //     }
  //   )
  // }

=======
>>>>>>> b46e06affa8e51f153632f611eb973a7c4068c81
  save() {
    let form = this.myReactiveForm.value
    let formData = new FormData();
    formData.append('firstName', form.firstName)
    formData.append('lastName', form.lastName)
    formData.append('email',form.email)
    formData.append('password',form.password)
    formData.append('otp', form.otp)
    formData.append('photo', this.fileToUpload,this.fileToUpload.name)
    console.log(formData)
    this._auth.registeredUser(formData).subscribe(
      (data:any)=>{
        this.toastr.success(data.message)
      this.loader = false;
      localStorage.setItem('token', data.token)
      this.router.navigate(['/special'])
      const tokenInfo = this.getDecodedAccessToken(data.token); // decode token
      const expireDate = tokenInfo.exp;
      this._auth.autologout(new Date(expireDate * 1000).getTime() - new Date().getTime())
    }, (err:any) => {
      this.toastr.error(err.message)
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
