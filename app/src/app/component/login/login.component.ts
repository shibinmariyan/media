import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private data: DataService, private route: Router, private http: HttpClient) { }


  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      'userName': [null, Validators.required],
      'password': [null, [Validators.required, this.checkPassword]]
    });
  }
  get userName() {
    return this.formGroup.get('userName') as FormControl
  }
  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }
  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }
  loginUser(data){
    let param: any = {
      username: data.userName,
      password: data.password
    };
    this.data.login(param)
      .subscribe((data: any) => {
        // this.resMsg = (data.status != 200) ? "Unauthorized Entry" : "Authorized Entry";
        // this.success = (data.status != 200) ? false : true;
        if (data.status != 200)
        console.log("dad")
          // this.error = data.output;
        else {
          this.auth.setToken(data.output);
          location.reload();
        }
      })
  }
  

}
