import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;


  constructor(private api: UserService, private toastr: ToastrService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.api.LoginByEmail().subscribe(res => {
        const user = res.find((loginUser: any) => {
          return loginUser.email == this.loginForm.value.email && loginUser.password == this.loginForm.value.password;
        })
        if (user) {
          localStorage.setItem("User",JSON.stringify(user.name));
          this.toastr.success('You Are Successfully Logged In');
          this.loginForm.reset();
          this.router.navigateByUrl('/todo');
        } else {
          this.toastr.success('Invalid Email or Password');
        }
      },
        err => { console.log(err); });
    }
  }
}
