import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../../interfaces/Employee.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-employee-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './add-employee-dialog.component.html',
  styleUrl: './add-employee-dialog.component.css',
})
export class AddEmployeeDialogComponent {
  employee: Employee = {
    id: 0,
    age: 0,
    dob: '',
    email: '',
    salary: '',
    address: '',
    imageUrl: '',
    lastName: '',
    firstName: '',
    contactNumber: '',
  };

  constructor(public dialogRef: MatDialogRef<AddEmployeeDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
