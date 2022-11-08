import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './appServices/auth.service';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SpecialEventComponent } from './special-event/special-event.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full',
  },
  {
    path:'events',
    component:EventsComponent,
    
  },
  {
    path:'special',
    component:SpecialEventComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'studentRegistration',
    component:StudentRegistrationComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[AuthGuard]
   
  },
  {
    path:'studentList',
    component:StudentListComponent,
    canActivate:[AuthGuard]
   
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate:[AuthGuard]
   
  },
  {
    path:'**',
    redirectTo:'/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

