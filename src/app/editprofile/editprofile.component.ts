import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ApiCalService } from '../appServices/api-cal.service';
import { AuthService } from '../appServices/auth.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  myReactiveForm!:FormGroup;
  selectedFile!:File;

  constructor( public _auth:AuthService,  private _apical:ApiCalService,private dialog:MatDialog,private fb:FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.myReactiveForm = this.fb.group({
      'firstName':[this.data.firstName,Validators.required],
      'lastName': [this.data.lastName,Validators.required],
      'email':[this.data.email,Validators.email],
    })
  }
  getFile(event:any){
    this.selectedFile = event.target.files[0]
  }

  editProfile(){ 
    let form = this.myReactiveForm.value
    let formdata = new FormData();
    formdata.append('photo',this.selectedFile)
    formdata.append('firstName',form.firstName)
    formdata.append('lastName',form.lastName)
    formdata.append('email',form.email)
   this._apical.editProfile(formdata).subscribe((res:any)=>{
    // console.log(res,'hello response from servr')
    this.toastr.success(res.message)
    window.location.reload();
  }, 
(err:any)=>{
    console.log(err)
    this.toastr.error(err.message)
   }) 
   }

}
