import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCalService {
  badgeCount = new Subject<any>()
  emailR = new Subject<any>()
  x:string = localStorage.getItem("token")!;

  constructor(private http:HttpClient) { 
  }

  StudentList():Observable<any>{

    console.log(this.badgeCount,'dixit22')
    // console.log(this.x+"dixit33"); 
    let headers = new HttpHeaders({
      'token': this.x
    })
    
    return this.http.get('http://localhost:3000/api/studentList',{headers:headers}
    );
  }
  
  DeleteRow(id:any):Observable<any>{
 
    let params = new HttpParams({
      fromObject: {
        _id:id
      }
    })
    let headers = new HttpHeaders({
      'token': this.x
    })
    return this.http.delete('http://localhost:3000/api/student-register',{headers:headers, params:params})
  }
  EditRow(updatedData:any,id:any):Observable<any>{
    // console.log(updatedData,id)
    let params = new HttpParams({
      fromObject:{
        _id:id
      }
    })
    let headers = new HttpHeaders({
      'token': this.x
    })
    return this.http.put('http://localhost:3000/api/student-register',updatedData,{headers:headers, params:params})
  }
  resetPassword(email:any){
    return this.http.post<void>('http://localhost:3000/api/reset-password',email)
  }
  resetNewPassword(email:any,otp:any,password:any){
    // console.log(email,body,'dixit')
    let param1 = new HttpParams({
      fromObject:{
        'email':"chetan",
        'otp':"jangid"
      }
    })
    return this.http.put(`http://localhost:3000/api/register?email=${email}&otp=${otp}`,password)
  }

}


