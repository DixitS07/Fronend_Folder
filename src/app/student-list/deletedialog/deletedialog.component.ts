import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiCalService } from 'src/app/appServices/api-cal.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.css']
})
export class DeletedialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletedialogComponent>,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data:any,private _snackBar: MatSnackBar,private _apical:ApiCalService) {}

  ngOnInit(): void {
  }
  
  onDelete(){

    console.log(this.data._id+'deleted the row with id ')
    this._apical.DeleteRow(this.data._id).subscribe((res)=>
    {console.log(res)
      this._snackBar.open('Data Is Deleted', 'Close',{
        duration: 1000
      })
      window.location.reload();
     
    },
    (err)=>{console.log(err)
      this._snackBar.open('Data Is Not Deleted', 'Close',{
        duration: 1000
      })
     
    })

  }
  
}
