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
              private toastr: ToastrService) { 
              }

  ngOnInit(): void {
    if (this._auth.loggedIn()) {
      this._router.navigate(['/events'])
    }
    this.myReactiveForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      photo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      otp: ['', [Validators.required,]]
    })
    console.log(this.myReactiveForm)
    }
    getFile(event:any){
      this.fileToUpload = event.target.files.item(0)
    }
  
  sendOtp(email:any){
    this.Myenable = false;
    if(this.myReactiveForm.get('email')?.valid){
    this._auth.otpVerify(email.value).subscribe(
      (err:any)=>{
        this.toastr.error(err.error.text)
        console.log(err,"error");
      },
      (res:any)=>{
        this.toastr.success(res.error.text)
        console.log(res);
      }
      
    )
    }
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
    let form = this.myReactiveForm.value
    let formData = new FormData();
    formData.append('firstName', form.firstName)
    formData.append('lastName', form.lastName)
    formData.append('email',form.email)
    formData.append('password',form.password)
    formData.append('otp', form.otp)
    formData.append('photo', this.fileToUpload,this.fileToUpload.name)
    // console.log(formData)
    this._auth.registeredUser(formData).subscribe(
      (data:any)=>{
      this.toastr.success(data.message)
      this.loader = false;
      localStorage.setItem('token', data.token)
      this._router.navigate(['/events'])
      const tokenInfo = this.getDecodedAccessToken(data.token); // decode token
      const expireDate = tokenInfo.exp;
      this._auth.autologout(new Date(expireDate * 1000).getTime() - new Date().getTime())
    }, (err:any) => {
      console.log(err)
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
