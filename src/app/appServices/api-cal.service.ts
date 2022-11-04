import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCalService {

  constructor(private http:HttpClient) { }
  

  StudentList():Observable<any>{
    return this.http.get('http://localhost:3000/api/studentList');
  }
  
  DeleteRow(id:any):Observable<any>{
    let params = new HttpParams({
      fromObject:{
        _id:id
      }
    })
    return this.http.delete('http://localhost:3000/api/delete',{params:params})
  }
  EditRow(id:any):Observable<any>{
    let params = new HttpParams({
      fromObject:{
        _id:id
      }
    })
    return this.http.put('http://localhost:3000/api/student-register',{params:params})
  }
}

