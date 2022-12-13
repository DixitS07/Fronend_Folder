import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static loggedIn() {
    throw new Error('Method not implemented.');
  }
  x:string = localStorage.getItem("token")!;
 

  constructor( private http:HttpClient, private _router:Router) { }
  
  registeredUser(user:any){
    console.log(user)
     return this.http.post('http://localhost:3000/api/register',user)
  }
  otpVerify(email:any){
     return this.http.post('http://localhost:3000/api/otpverify',{email})
  }
  registeredStudent(student:any){
     return this.http.post('http://localhost:3000/api/student-register',student)
  }

  loggedUser(user:any){
    // let myheaders = new HttpHeaders({
    //   'Content-Type':'application/json'
    // })
    return this.http.post('http://localhost:3000/api/login',user)
  }

  loggedIn(){
 
    return !! localStorage.getItem('token')
    
  }
  logoutUser(){
    window.location.reload();
    this._router.navigate(['/login'])
    return localStorage.removeItem('token')
  }
  autoLogout(expireDate:any){
    setTimeout(() => {
      this.logoutUser()
    },expireDate);
  }

  getToken(){
    return localStorage.getItem('token')
  }
  googleSignin(user: any){
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp`,user)
    // localStorage.setItem('token',token)
      // this._router.navigate(['/special'])
    
    // return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=$(user)`,
    // postBody:`id_token=${token}providerId=google.com`,
    // requestUri:'http://localhost:4200',
    // // returnIdpCredential:true,
    // // returnSecureToken:true
    // )
  }
  autologout(expire:number){
    setTimeout(()=>{
      this.logoutUser();
    },expire)
  }
  FbLogin(){
    let myHeaders = new HttpHeaders({
      "Access-Control-Allow-Origin":"*",
      "Content-Type": "text/html"
    })
   return this.http.get('http://localhost:3000/auth/facebook',{headers:myHeaders})
  }
}
