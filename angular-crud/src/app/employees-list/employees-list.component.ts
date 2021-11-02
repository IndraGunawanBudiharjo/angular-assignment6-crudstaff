import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../models/rest-api.service';
import { Employees } from '../models/employees';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  Employee: Employees[] = [];

  constructor(public restApi: RestApiService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    return this.restApi.getEmployees().subscribe( data => this.Employee = data);
  }

  deleteEmployee(id: number) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.restApi.deleteEmployee(id)
        .subscribe(data => this.loadEmployees())
    }
  }

}
