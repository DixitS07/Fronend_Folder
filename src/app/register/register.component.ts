import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../appServices/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUSerData:any={}
  constructor(private _auth: AuthService, 
              private _router: Router) { }

  ngOnInit(): void {
  }
  registerUSer(){
    this._auth.registeredUser(this.registerUSerData).subscribe(
      (res)=>{console.log(res)
      // localStorage.setItem('token',res.token)
      this._router.navigate(['/special'])
      },
      (err)=>console.log(err)
    )
  }

}