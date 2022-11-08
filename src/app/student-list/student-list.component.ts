import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ApiCalService } from '../appServices/api-cal.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogeBoxComponent } from '../dialoge-box/dialoge-box.component';
import { DeletedialogComponent } from './deletedialog/deletedialog.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, AfterViewInit {

  dataSource:any =[]
  sIdvar:any;


  constructor(private apicall:ApiCalService,
              private _liveAnnouncer: LiveAnnouncer,public dialog: MatDialog ) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['firstName', 'lastName', 'age', 'email','phone','address','actions'];



  ngOnInit(): void {

    this.apicall.StudentList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      // console.log(this.dataSource._data.value,'data1')
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  openProfile(ele:any){
    const dialogRef = this.dialog.open(ProfileComponent, {
      width: '750px',
      height:'750px',
      data:ele
    });
  }
  openDialog(elid:any): void {
    console.log(elid,'from slist')
    // this.sIdvar = elid
    const dialogRef = this.dialog.open(DialogeBoxComponent, {
      width: '750px',
      height:'750px',
      data:elid
    });
    
  }

  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string,elid:any): void {
    this.dialog.open(DeletedialogComponent, {
      width: '250px',
      data:elid,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}


