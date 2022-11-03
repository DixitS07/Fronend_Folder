import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.css']
})
export class DeletedialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }
  
  onDelete(){
    console.log(this.data._id)
    console.log('deleted the row with id ')
    this._snackBar.open('Data Is Deleted', 'Close');
  }
  
}
