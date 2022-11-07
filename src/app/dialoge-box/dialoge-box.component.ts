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
  selectedFile!:File;

  constructor( public dialogRef: MatDialogRef<DialogeBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private fb:FormBuilder,private _snackBar: MatSnackBar,private _apical:ApiCalService ) {
      console.log(data,'coming from slist to dialog')
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    
    this.myReactiveForm = this.fb.group({
      'firstName':[this.data.firstName,Validators.required],
      'lastName': [this.data.lastName],
      'age':[this.data.age],
      'email':[this.data.email,Validators.email],
      'phone': [this.data.phone],
      'address': [this.data.address],
      'password':[this.data.password],
    })
  }
  getFile(event:any){
    this.selectedFile = event.target.files[0]
  }
  editStudent(){ 
    let form = this.myReactiveForm.value
    let formdata = new FormData();
    formdata.append('photo',this.selectedFile)
    formdata.append('firstName',form.firstName)
    formdata.append('lastName',form.lastName)
    formdata.append('age',form.age)
    formdata.append('email',form.email)
    formdata.append('phone',form.phone)
    formdata.append('address',form.address)
    formdata.append('password',form.password) 
   this._apical.EditRow(formdata,this.data._id).subscribe((res)=>{
    console.log(res,'hello response from servr')
   this._snackBar.open('Data Is Updated', 'Close',{
     duration: 500
   })
   window.location.reload();
  }, 
(err)=>{
    this._snackBar.open('Data Is Not Updated', 'Close',{
      duration: 1000
    })
    window.location.reload();
    console.log(err)
   }) 
   }
  
 

}
