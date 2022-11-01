import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

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
    console.log('http')
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
    return localStorage.removeItem('token')
    this._router.navigate(['/login'])

  }
  getToken(){
    return localStorage.getItem('token')
  }
}
