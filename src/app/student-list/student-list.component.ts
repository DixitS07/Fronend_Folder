import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ApiCalService } from '../appServices/api-cal.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogeBoxComponent } from '../dialoge-box/dialoge-box.component';
import { DeletedialogComponent } from './deletedialog/deletedialog.component';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';


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

  displayedColumns: string[] = ['photo','firstName', 'lastName', 'age', 'email','phone','address','actions'];



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



makePdf() {

  var element = document.getElementById('pdfTable')as HTMLImageElement
  html2canvas(element).then(canvas => {
    // console.log(canvas);
  const contentDataURL = canvas.toDataURL('image/png')
  let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
  var width = pdf.internal.pageSize.getWidth();
  var height = canvas.height * width / canvas.width;
  pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
  pdf.save('output.pdf'); // Generated PDF
  });
  // let PdfFile = document.getElementById('pdfTable').contentWindow;
  }
}
