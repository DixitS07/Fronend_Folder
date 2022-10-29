import { Component } from '@angular/core';
import { AuthService } from './appServices/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngApp';

  constructor(public _auth:AuthService ) {}

}
