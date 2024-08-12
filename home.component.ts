import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { EmpDetailDialogComponent } from '../emp-detail-dialog/emp-detail-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employees$: Observable<Employee[]>;
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];
  searchTerm: string = '';

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.employees$ = this.employeeService.getEmployees();
  }

  addEmployee(): void {
    const dialogRef = this.dialog.open(EmpDetailDialogComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.addEmployee(result);
      }
    });
  }

  editEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(EmpDetailDialogComponent, {
      width: '300px',
      data: { ...employee }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.updateEmployee({ ...employee, ...result });
      }
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id);
  }

  searchEmployees(employees: Employee[]): Employee[] {
    const term = this.searchTerm.toLowerCase();
    return employees.filter(employee =>
      employee.name.toLowerCase().includes(term) ||
      employee.email.toLowerCase().includes(term) ||
      employee.phone.includes(term)
    );
  }
}
