import { Component, OnInit } from '@angular/core';
import { ApiCalService } from '../appServices/api-cal.service';
import { AuthService } from '../appServices/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  badgeCount:any=0;
  constructor(public _auth:AuthService,private _apicall:ApiCalService ) { 
    this._apicall.badgeCount.subscribe(count=>{
      this.badgeCount=count
      // console.log(this.badgeCount,count)
    })
  }

  ngOnInit(): void {
   
  }
  title = 'thirdproject';
  hidden = false;
  sidenav:any =true;
  menuicon:any = false;
  panelOpenState = false;
  
  
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  sidenavToggle(){
    this.menuicon=true 
    this.sidenav=false
  }
sidenavToggler(){
    this.menuicon=false
    this.sidenav=true
  }


}
