import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatRippleModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


const Materials=[
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatRippleModule,
  MatTableModule,
  MatPaginatorModule,
  MatInputModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatBadgeModule,
  MatMenuModule,
  MatListModule,
  MatGridListModule,
  MatExpansionModule,
  MatTabsModule,
  MatAutocompleteModule,
  // MatPaginator,
  MatSortModule,
  MatSnackBarModule,
  MatDialogModule,
  
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Materials
  ],
  exports:[
    Materials
  ]
})
export class MaterialsModule { }
