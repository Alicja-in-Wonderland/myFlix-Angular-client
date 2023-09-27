import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }
  /**
   * This is the method that will open the dialog when the Sign Up button is clicked
   * @param void
   * @returns UserRegistrationFormComponent
   * @memberof WelcomePageComponent
   * @see UserRegistrationFormComponent
   * @example openUserRegistrationDialog()
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }
  /**
  * This is the method that will open the dialog when the Log In button is clicked
  * @param void
  * @returns UserLoginFormComponent
  * @memberof WelcomePageComponent
  * @see UserLoginFormComponent
  * @example openUserLoginDialog()
  */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}