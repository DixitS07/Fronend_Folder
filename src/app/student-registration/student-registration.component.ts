import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../appServices/auth.service';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit {
  constructor(private _authservice:AuthService, private _router:Router, private fb:FormBuilder, private _snackBar: MatSnackBar,private renderer:Renderer2 ) { }

  selectedFile!:File;
  myReactiveForm!:FormGroup;
  progress:boolean=false;
  imgshow:boolean = false;
  imgurl:any
  @ViewChild('imgupload') imgupload!:ElementRef
  @ViewChild('myimg') myimg!:ElementRef

  ngOnInit(): void {
    this.myReactiveForm = this.fb.group({
      'photo': ['',Validators.required],  
      'firstName':['',Validators.required],
      'lastName': ['',Validators.required],
      'age':['',Validators.required],
      'email':['',[Validators.email,Validators.required]],
      'phone': ['',Validators.required],
      'address': ['',Validators.required],
      'password':['',[Validators.required, Validators.minLength(6)]],
    })
  }
  
  
  getFile(event:any){
    this.imgshow = true
    this.selectedFile = event.target.files.item(0)
    const reader = new FileReader();
    // console.log(reader,'from getfile')
    reader.onload = () => {
      this.imgurl = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
    // console.log(event,'from getfilefn')
    }
 
  

  registerstudent(){
    this.progress= true
    console.log(this.myReactiveForm.value,'dixitsinfhfhhhhhh')
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
      this._snackBar.open(res.message, 'Close',{
        duration: 1000
      })
      this.progress=false
      this._router.navigate(['/studentList'])
    },
     (err)=>{
      console.log(err)
      this.progress=false
      this._snackBar.open(err.message, 'Close',{
        duration: 1000
      })
    })
  } 



 

}
