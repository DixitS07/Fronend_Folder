import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ApiCalService } from '../appServices/api-cal.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogeBoxComponent } from '../dialoge-box/dialoge-box.component';
import { DeletedialogComponent } from './deletedialog/deletedialog.component';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { NgxSpinnerService } from "ngx-spinner";
import { studentData } from '../appInterfaces/interface';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})


export class StudentListComponent implements OnInit,AfterViewInit {

  dataSource:any =[]
  fetchData:studentData[]=[]
  
  constructor(private apicall:ApiCalService,
              private _liveAnnouncer: LiveAnnouncer,public dialog: MatDialog,
              private spinner: NgxSpinnerService) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['photo','firstName', 'lastName', 'age', 'email','phone','address','actions'];



  ngOnInit(): void {
   
    this.spinner.show();
    this.apicall.StudentList().subscribe((data)=>{
      this.fetchData = data
    this.apicall.badgeCount.next(this.fetchData.length)
      this.dataSource=new MatTableDataSource(data);
      this.spinner.hide();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log(this.fetchData.length,this.fetchData,'data1')
    })
    
    
  }
  ngAfterViewInit() {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openDialog(ele:String): void {
    // console.log(elid,'from slist')
    const dialogRef = this.dialog.open(DialogeBoxComponent, {
      width: '750px',
      height:'750px',
      data:ele
    });
    
  }

  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string,ele:String): void {
    this.dialog.open(DeletedialogComponent, {
      width: '250px',
      data:ele,
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
  onExportCsv(){
    // console.log(this.fetchData,"CSV DATA")
    this.fetchData.forEach((element:any) => {
    delete element['_id'];
    delete element['photo']
    delete element['__v'];
    delete element['password'];
      
    });
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'User Data',
      useBom: true,
      noDownload: false,
      headers: [ "First Name", "Last Name",  "Age", "Email", "Phone", "Address"]
    };
   
    new ngxCsv(this.fetchData, "reportcsv", options);
  }

}
