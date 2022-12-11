import { Component, OnInit } from '@angular/core'
import { ElementRef, Inject } from '@angular/core'
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog'
import { MatMenu } from '@angular/material/menu'
import { ApiCalService } from 'src/app/appServices/api-cal.service'
import { AuthService } from 'src/app/appServices/auth.service'
import { EditprofileComponent } from 'src/app/editprofile/editprofile.component'
import { DeleteAccountComponent } from '../delete-account/delete-account.component';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.css']
})
export class MenuDialogComponent implements OnInit {
  loggedUserName:any; 
  loggedUserData:any={};

  constructor(public _auth:AuthService,private dialog:MatDialog,private _apicall:ApiCalService,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    console.log(this.data);
    this._apicall.userDetails().subscribe(
      (res)=>{
        console.log(res)
        this.loggedUserData = res
        this.loggedUserName = res.firstName
      }
    )
  }

openDeleteDialog(){
  const dialogRef = this.dialog.open(DeleteAccountComponent, {
    width: '500px',
  });
  dialogRef.afterClosed().subscribe();
}

openEditDialog(){
  const dialogRef = this.dialog.open(EditprofileComponent, {
    width: '500px',
    data: this.loggedUserData
  });
  dialogRef.afterClosed().subscribe();
}

}

