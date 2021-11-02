import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employees } from '../models/employees';
import { RestApiService } from '../models/rest-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchValidator } from '../form-validators';

@Component({
  selector: 'app-employees-create',
  templateUrl: './employees-create.component.html',
  styleUrls: ['./employees-create.component.css']
})
export class EmployeesCreateComponent implements OnInit {

  // employeeDetails: Employees = {id: 0, title: '', firstName: '', lastName: '', role: '',  email: '', password: '', confirmPassword: ''};

  Roles: any = ['User', 'Admin']

  createForm = {
    inputData: new FormGroup({
      title: new FormControl('',[Validators.required]),
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl(''),
      email: new FormControl('',[Validators.required, Validators.email]),
      role: new FormControl('this.Roles[0]',[Validators.required]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
      confirmPassword: new FormControl('',[Validators.required, matchValidator('password')]),

    })
  } 

  constructor(public restApi: RestApiService, public router: Router) { }

  ngOnInit(): void {
   
  }


  get title(){ return this.createForm.inputData.get('title') }
  get firstName(){ return this.createForm.inputData.get('firstName') }
  get lastName(){ return this.createForm.inputData.get('lastName') }
  get role(){ return this.createForm.inputData.get('role') }
  get email(){ return this.createForm.inputData.get('email') }
  get password(){ return this.createForm.inputData.get('password') }
  get confirmPassword(){ return this.createForm.inputData.get('confirmPassword') }

  addEmployee() {
    this.restApi.createEmployee(this.createForm.inputData.value)
      .subscribe((data: {}) => {
        this.router.navigate(['/employees-list']);
      })
  }




}
