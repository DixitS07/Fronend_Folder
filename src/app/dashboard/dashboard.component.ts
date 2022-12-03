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
  username:any;
  constructor(public _auth:AuthService,private _apicall:ApiCalService ) { 
    
  }

  ngOnInit(): void {
   let name= this._apicall.badgeCount.subscribe(count=>{
      this.badgeCount=count
      name.unsubscribe()
      console.log(this.badgeCount,count)
    })
    let usname = this._auth.userId.subscribe(uname=>{
      this.username = uname
      usname.unsubscribe()
      console.log(this.username,uname)
    })
  }
  sidenav:any =true;
  menuicon:any = false;
  

  sidenavToggle(){
    this.menuicon=true 
    this.sidenav=false
  }
sidenavToggler(){
    this.menuicon=false
    this.sidenav=true
  }


}
