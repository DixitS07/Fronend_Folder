import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static loggedIn() {
    throw new Error('Method not implemented.');
  }
  

  constructor( private http:HttpClient, private _router:Router) { }
  
  registeredUser(user:any){
    //  let myheaders = new HttpHeaders({
    //   'Content-Type':'application/json'
    // })
    console.log('http')
     return this.http.post('http://localhost:3000/api/register',user)
  }
  registeredStudent(student:any){
    //  let myheaders = new HttpHeaders({
    //   'Content-Type':'application/json'
    // })
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
    this._router.navigate(['/login'])
    window.location.reload();
    return localStorage.removeItem('token')

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
  FbLogin(){
    let myHeaders = new HttpHeaders({
      "Access-Control-Allow-Origin":"*"
    })
   return this.http.get('http://localhost:3000/auth/facebook',{headers:myHeaders})
  }
}
