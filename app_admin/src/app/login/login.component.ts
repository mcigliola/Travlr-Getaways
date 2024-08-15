import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  public formError: string = '';
  public credentials = {
    name: '',
    email: '',
    password: ''
  }

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required.  Please try again';
      this.router.navigateByUrl('#'); // Return to login page
    }
    else {
      this.doLogin();
    }
  }

  private doLogin(): void {
    this.authenticationService
      .login(this.credentials.email, this.credentials.password)
      .subscribe({
        next: () => this.router.navigateByUrl('list-trips'),
      error: (message) => {
        this.formError = message;
      }
      });
  }
}
