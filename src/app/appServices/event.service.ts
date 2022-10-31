import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _eventsURL="http://localhost:3000/api/events"
  private _specialEventsURL="http://localhost:3000/api/special"

  constructor( private http:HttpClient) { }

  getEvents(){
    return this.http.get<any>(this._eventsURL)
  }

  getspecialEvents(){
    return this.http.get<any>(this._specialEventsURL)

  }
}
