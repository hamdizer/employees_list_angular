import {
  Component,
  ViewChild,
  OnInit,
  HostListener,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from '../../../interfaces/Employee.interface';
import { EmployeesService } from '../../employees.service';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { isPlatformBrowser } from '@angular/common';

import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent,
  MatPaginatorIntl,
} from '@angular/material/paginator';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'employees-list',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css',
})
export class EmployeesListComponent implements OnInit {
  displayedColumns = [
    'select',
    'id',
    'age',
    'dob',
    'email',
    'salary',
    'address',
    'imageUrl',
    'lastName',
    'firstName',
    'contactNumber',
    'action',
  ];
  public employees: Employee[] = [];

  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>(
    this.employees
  );
  selection = new SelectionModel<Employee>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public pageSizeOptions = [5, 10, 20];
  public currentPageSize = this.pageSizeOptions[1];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private employeeService: EmployeesService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchEmployees();

    if (isPlatformBrowser(this.platformId)) {
      this.updateDisplayedColumns();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
      this.updateDisplayedColumns();
    }
  }

  updateDisplayedColumns() {
    const width = window.innerWidth;
    if (width <= 600) {
      this.displayedColumns = ['select', 'age', 'dob', 'email'];
    } else if (width <= 1024) {
      this.displayedColumns = [
        'select',
        'age',
        'dob',
        'email',
        'salary',
        'address',
      ];
    } else {
      this.displayedColumns = [
        'select',
        'id',
        'age',
        'dob',
        'email',
        'salary',
        'address',
        'imageUrl',
        'lastName',
        'firstName',
        'contactNumber',
        'action',
      ];
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  fetchEmployees() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addEmployee(result);
      }
    });
  }
  addEmployee(employee: Employee) {
    employee.id = this.dataSource.data.length + 1;
    this.dataSource.data = [...this.dataSource.data, employee];
  }
  deleteEmployee(id: number) {
    const updatedList = this.dataSource.data.filter(
      (employee) => employee.id !== id
    );
    this.dataSource.data = updatedList;
  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  deleteSelectedEmployees() {
    const deletedIds = new Set<number>();

    this.selection.selected.forEach((selected) => {
      const index = this.dataSource.data.findIndex((e) => e.id === selected.id);
      if (index !== -1) {
        this.dataSource.data.splice(index, 1);
        deletedIds.add(selected.id);
      }
    });
    this.selection.clear();

    this.dataSource.data = this.dataSource.data.filter(
      (employee) => !deletedIds.has(employee.id)
    );
  }
}
