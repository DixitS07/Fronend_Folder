import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ApiCalService } from '../appServices/api-cal.service';
import { AuthService } from '../appServices/auth.service';
import { MenuDialogComponent } from './menu-dialog/menu-dialog.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  badgeCount:any=0;
  username:any; 
  btntoggle:boolean = false;
  // @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;
  @ViewChild('myButton',{read: ElementRef, static:false}) public myButtonRef!: ElementRef
  constructor(public _auth:AuthService,private _apicall:ApiCalService,public dialog: MatDialog,) { 
    
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
  
  // onToggle(){
  //   this.btntoggle = !this.btntoggle
  // }

  sidenavToggle(){
    this.menuicon=true 
    this.sidenav=false
  }
sidenavToggler(){
    this.menuicon=false
    this.sidenav=true
  }

  openDialog() {
    const bodyRect = document.body.getBoundingClientRect();
    const elemRect = this.myButtonRef.nativeElement.getBoundingClientRect();
    console.log(elemRect)
    const right = bodyRect.right - elemRect.right;
    const top = elemRect.top - bodyRect.top+25;
    const dialogRef = this.dialog.open(MenuDialogComponent, {
      width: '250px',
      height:'300px',
      position: { right: right +'px', top: top + 'px' },
      hasBackdrop: true,
    });
    dialogRef.afterClosed().subscribe();
  }

}
