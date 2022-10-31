import { Component, OnInit } from '@angular/core';
import { EventService } from '../appServices/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: any = [];
  constructor(private _eventservice:EventService) { }

  ngOnInit(): void {
    this._eventservice.getEvents().subscribe(
      (res)=>this.events =  res  ,
      (err)=> console.log(err)
    )
  }

}
