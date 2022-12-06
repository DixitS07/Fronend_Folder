import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiCalService } from '../appServices/api-cal.service';
import { AuthService } from '../appServices/auth.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {
 
  constructor(private _api: ApiCalService, private _router:Router,private toastr: ToastrService, private _auth :AuthService) { }

  ngOnInit(): void {
  }


  DeleteAccount(Password:string){
      console.log(Password)
      this._api.delAccount(Password).subscribe((res:any)=>{console.log(res),
        this.toastr.success("Account Deleted Successfully");
        this._router.navigate(['/login'])
        window.location.reload();
        localStorage.removeItem('token')
      },(err:any)=>{
      console.log(err)
      this.toastr.error("Password Not Matched Account Not Deleted");
      })
    
  }

}
