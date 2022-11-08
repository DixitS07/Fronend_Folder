import { Component, OnInit } from '@angular/core';
import { AuthService } from '../appServices/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public _auth:AuthService ) { }

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
