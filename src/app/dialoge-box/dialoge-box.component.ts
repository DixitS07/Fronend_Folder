import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiCalService } from '../appServices/api-cal.service';



@Component({
  selector: 'app-dialoge-box',
  templateUrl: './dialoge-box.component.html',
  styleUrls: ['./dialoge-box.component.css']
})
export class DialogeBoxComponent implements OnInit {

  myReactiveForm!:FormGroup;
  sIdvar:any;

  constructor( public dialogRef: MatDialogRef<DialogeBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private fb:FormBuilder,private _snackBar: MatSnackBar,private _apical:ApiCalService ) {
      console.log(data,'coming from slist to dialog')
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    
    this.myReactiveForm = this.fb.group({
      // 'photo': [''],
      'firstName':[this.data.firstName,Validators.required],
      'lastName': [this.data.lastName],
      'age':[this.data.age],
      'email':[this.data.email,Validators.email],
      'phone': [this.data.phone],
      'address': [this.data.address],
      'password':[this.data.password],
    })
  }
  editStudent(){  
   console.log(this.data,'from dialogcomp')
   console.log('edit api call')  
  }
  
  openSnackBar() {
    this._snackBar.open('Form Is Updated', 'Close');
  }

}