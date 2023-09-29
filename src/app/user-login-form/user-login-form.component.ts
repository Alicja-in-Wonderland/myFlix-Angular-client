import { Component, Input, OnInit } from '@angular/core';

//This import is used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

//This import brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

//This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() loginData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  //This method is called once the component has received all its inputs from the calling component/the user
  ngOnInit(): void {
  }

  /**
   * This method will send the form inputs to the backend
   * @param void
   * @returns user object
   * @memberof UserLoginFormComponent
   * @see FetchApiDataService.userLogin()
   * @example loginUser()
   */
  //This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe((result) => {
      //Logic for a successful user registration goes here (To be implemented)
      localStorage.setItem('username', result.user.Username);
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      this.router.navigate(['movies']);
      this.dialogRef.close(); // This will close the modal on success
      this.snackBar.open('You\'re logged in!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
