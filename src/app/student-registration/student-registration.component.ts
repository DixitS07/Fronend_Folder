import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../appServices/auth.service';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit {
  constructor(private _authservice:AuthService, private _router:Router) { }
  registerdUserData:any={}
  // selectedFile = null;

  ngOnInit(): void {
  }
  
  // onFileSelect(event:any){
  //   this.selectedFile = event.target.files[0]
  // }

  registerUser(){
    // console.log(this.registerdUserData)
    this._authservice.registeredUser(this.registerdUserData).subscribe((res:any)=>{
      console.log(res)
      localStorage.setItem('token', res.token)
      this._router.navigate(['/special'])
    },
     (err)=>{
      console.log(err)
    })
  }

}
