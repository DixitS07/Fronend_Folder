import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCalService {
  
  constructor(private http:HttpClient) {
  }
  
  badgeCount = new Subject<any>()
  emailR = new Subject<any>()
  StudentList():Observable<any>{
    return this.http.get('http://localhost:3000/api/studentList');
  }
  
  DeleteRow(id:any):Observable<any>{
    let params = new HttpParams({
      fromObject: {
        _id:id
      }
    })
    return this.http.delete('http://localhost:3000/api/student-register',{params:params})
  }
  EditRow(updatedData:any,id:any):Observable<any>{
    // console.log(updatedData,id)
    let params = new HttpParams({
      fromObject:{
        _id:id
      }
    })
    return this.http.put('http://localhost:3000/api/student-register',updatedData,{params:params})
  }
  resetPassword(email:any){
    return this.http.post('http://localhost:3000/api/reset-password',email)
  }
  resetNewPassword(email:any){
    return this.http.put('http://localhost:3000/api/register',email)
  }

}


