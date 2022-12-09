import { Component, OnInit } from '@angular/core'
import { ElementRef, Inject } from '@angular/core'
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog'
import { MatMenu } from '@angular/material/menu'
import { AuthService } from 'src/app/appServices/auth.service'
import { DeleteAccountComponent } from '../delete-account/delete-account.component';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.css']
})
export class MenuDialogComponent implements OnInit {

  constructor(public _auth:AuthService,private dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }
openDeleteDialog(){
  const dialogRef = this.dialog.open(DeleteAccountComponent, {
    width: '500px',
  });
  dialogRef.afterClosed().subscribe();
}
}
