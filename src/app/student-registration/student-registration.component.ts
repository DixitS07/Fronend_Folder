import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../appServices/auth.service';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit {
  constructor(private _authservice:AuthService, private _router:Router, private fb:FormBuilder, private _snackBar: MatSnackBar) { }
  registerdUserData:any={}
  selectedFile:any;
  myReactiveForm!:FormGroup;
  progress:boolean=false;

  openSnackBar() {
    this._snackBar.open('Form Is Submitted', 'Close');
  }

  ngOnInit(): void {
    this.myReactiveForm = this.fb.group({
      // 'photo': [''],
      'firstName':[null,Validators.required],
      'lastName': [''],
      'age':[''],
      'email':[null,Validators.email],
      'phone': [''],
      'address': [''],
      'password':[''],
    })
  }
  
  getFile(event:any){
    this.selectedFile = event.target.files[0]
  }

  registerstudent(){
    this.progress= true
    // console.log(this.registerdUserData)
    let formdata = new FormData();
    // formdata.append('firstName',this.myReactiveForm.get('firstName').value)
    // formdata.append('file',this.selectedFile)
    this._authservice.registeredStudent(this.myReactiveForm.value).subscribe((res:any)=>{
      console.log(res)
      this.progress=false
      // localStorage.setItem('token', res.token)
      this._router.navigate(['/studentList'])
    },
     (err)=>{
      console.log(err)
      this.progress=false
    })
  }

}
