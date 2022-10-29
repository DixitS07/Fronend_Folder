import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../appServices/event.service';

@Component({
  selector: 'app-special-event',
  templateUrl: './special-event.component.html',
  styleUrls: ['./special-event.component.css']
})
export class SpecialEventComponent implements OnInit {
 specialEvents:any =[]
  constructor(private _eventservice:EventService,
              private _route:Router) { }

  ngOnInit(): void {
    this._eventservice.getspecialEvents().subscribe(
      (res)=> {this.specialEvents = res},
      (err)=> {if(err instanceof HttpErrorResponse ){
                  if(err.status === 401){
                    this._route.navigate(['/login'])
                  }
      }
    }
    )
  }

}
