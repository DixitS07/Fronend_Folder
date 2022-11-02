import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCalService {

  constructor(private http:HttpClient) { }
  

  StudentList():Observable<any>{
    return this.http.get('http://localhost:3000/api/studentList');
  }
  
}

