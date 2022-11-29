import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _eventsURL="http://localhost:3000/api/events"
  private _specialEventsURL="http://localhost:3000/api/special"

  constructor( private http:HttpClient) { }

  getEvents(){
    let myHeaders = new HttpHeaders({
      "Access-Control-Allow-Origin":"*"
    })
    return this.http.get<any>(this._eventsURL,{headers:myHeaders})
  }

  getspecialEvents(){
    return this.http.get<any>(this._specialEventsURL)

  }
}
