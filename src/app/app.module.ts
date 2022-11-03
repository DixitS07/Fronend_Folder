import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { SpecialEventComponent } from './special-event/special-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EventService } from './appServices/event.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './appServices/token-interceptor.service';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { AuthService } from './appServices/auth.service';
import { MaterialsModule } from './appModules/materials/materials.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentListComponent } from './student-list/student-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { DialogeBoxComponent } from './dialoge-box/dialoge-box.component';
import { DeletedialogComponent } from './student-list/deletedialog/deletedialog.component';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    EventsComponent,
    SpecialEventComponent,
    StudentRegistrationComponent,
    DashboardComponent,
    StudentListComponent,
    DialogeBoxComponent,
    DeletedialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton : false,
          newestOnTop : false,
          progressBar : false,
         
    }),

    ToastContainerModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxSpinnerModule
    
    
  ],
  providers: [AuthService,EventService,AuthGuard,{
    provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptorService,
    multi :true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
