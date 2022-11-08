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
  selectedFile!:File;
  myReactiveForm!:FormGroup;
  progress:boolean=false;

 

  ngOnInit(): void {
    this.myReactiveForm = this.fb.group({
      'photo': [''],
      'firstName':[null,Validators.required],
      'lastName': ['',Validators.required],
      'age':[''],
      'email':[null,[Validators.email,Validators.required]],
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
    // console.log(this.myReactiveForm.value)
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
    this._authservice.registeredStudent(formdata).subscribe((res:any)=>{
      console.log(res)
      this._snackBar.open('Form Is Submitted', 'Close',{
        duration: 1000
      })
      this.progress=false
      // localStorage.setItem('token', res.token)
      this._router.navigate(['/studentList'])
    },
     (err)=>{
      console.log(err)
      this.progress=false
      this._snackBar.open('Form Is Not Submitted', 'Close',{
        duration: 1000
      })
    })
  }

 

}
