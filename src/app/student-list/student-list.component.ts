import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiCalService } from '../appServices/api-cal.service';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  dataSource:any =[]

  constructor(private apicall:ApiCalService) { }
  displayedColumns: string[] = ['userId', 'id', 'title', 'body'];



  ngOnInit(): void {

    this.apicall.StudentList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      console.log(this.dataSource,'data1')
    })
  }
 
}
