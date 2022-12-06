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
  btntoggle:boolean = false;
  
  constructor(public _auth:AuthService,private _apicall:ApiCalService ) { 
    
  }

  ngOnInit(): void {
   let name= this._apicall.badgeCount.subscribe(count=>{
      this.badgeCount=count
      name.unsubscribe()
      console.log(this.badgeCount,count)
    })
    this._auth.getUserName.subscribe(uname=>{
      this.username = uname
      console.log(this.username)
    })
  }
  sidenav:any =true;
  menuicon:any = false;
  
  onToggle(){
    this.btntoggle = !this.btntoggle
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
