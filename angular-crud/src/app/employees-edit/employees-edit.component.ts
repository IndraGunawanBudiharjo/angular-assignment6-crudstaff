import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../models/rest-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { matchValidator } from '../form-validators';
import { Employees } from '../models/employees';

@Component({
  selector: 'app-employees-edit',
  templateUrl: './employees-edit.component.html',
  styleUrls: ['./employees-edit.component.css']
})
export class EmployeesEditComponent implements OnInit {

  id: number = 0;

  Roles: any = ['User', 'Admin']

  editForm = {
    inputData: new FormGroup({
      title: new FormControl('',[Validators.required]),
      firstName: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      lastName: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      email: new FormControl('',[Validators.required, Validators.email]),
      role: new FormControl('this.Roles[0]',[Validators.required]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
      confirmPassword: new FormControl('',[Validators.required, matchValidator('password')]),

    })
  }

  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { this.id = this.actRoute.snapshot.params['id']; }


  ngOnInit(): void {
    this.restApi.getEmployee(this.id)
    .subscribe( data => {
      this.editForm.inputData.controls['title'].setValue(data.title)
      this.editForm.inputData.controls['firstName'].setValue(data.firstName)
      this.editForm.inputData.controls['lastName'].setValue(data.lastName)
      this.editForm.inputData.controls['email'].setValue(data.email)
      this.editForm.inputData.controls['role'].setValue(data.role)
    });
  }

  get title(){ return this.editForm.inputData.get('title') }
  get firstName(){ return this.editForm.inputData.get('firstName') }
  get lastName(){ return this.editForm.inputData.get('lastName') }
  get role(){ return this.editForm.inputData.get('role') }
  get email(){ return this.editForm.inputData.get('email') }
  get password(){ return this.editForm.inputData.get('password') }
  get confirmPassword(){ return this.editForm.inputData.get('confirmPassword') }





  updateEmployee() {
    if (window.confirm('Are you sure you want to update?')) {
      this.restApi.updateEmployee(this.editForm.inputData.value, this.id)
        .subscribe(data => {
          if(data){
            this.router.navigate(['/employees-list'])
          }
        })

    }
  }

}
