import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor( private http:HttpClient, private _router:Router) { }
  
  registeredUser(user:any){
     let myheaders = new HttpHeaders({
      'Content-Type':'application/json'
    })
     return this.http.post('http://localhost:3000/api/register',user,{headers:myheaders})
  }

  loggedUser(user:any){
    let myheaders = new HttpHeaders({
      'Content-Type':'application/json'
    })
    return this.http.post('http://localhost:3000/api/login',user,{headers:myheaders})
  }

  loggedIn(){
    return !! localStorage.getItem('token')
  }
  logoutUser(){
    return localStorage.removeItem('token')
    this._router.navigate(['/events'])

  }
  getToken(){
    return localStorage.getItem('token')
  }
}