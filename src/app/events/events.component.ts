import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../appServices/event.service';
import { events } from '../appInterfaces/interface';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events:events[] = [];
  constructor(private _eventservice:EventService,
                            private _route:Router) { }

  ngOnInit(): void {
    this._eventservice.getEvents().subscribe(
      (res)=>{
        console.log(res)
        this.events =  res}  ,
      (err)=>{if(err instanceof HttpErrorResponse ){
        if(err.status === 401){
          this._route.navigate(['/login'])
        }
      }
    })
  }
}

