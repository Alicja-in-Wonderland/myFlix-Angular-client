import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  user: any = {};
  favouriteMovies: any[] = [];

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '', };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * This method gets the user info and returns it along with their favourite movies
   * @param void
   * @returns user object
   * @memberof ProfileViewComponent
   * @see FetchApiDataService.getOneUser()
   * @example getUser()
   */
  //This method gets the user info and returns it along with their favourite movies
  getUser(): void {
    this.fetchApiData.getOneUser().subscribe((response: any) => {
      this.user = response;
      this.userData.Username = this.user.Username;
      this.userData.Email = this.user.Email;
      this.user.Birthday = formatDate(this.user.Birthday, 'dd-MM-yyyy', 'en-US', 'UTC+0');


      this.fetchApiData.getAllMovies().subscribe((response: any) => {
        this.favouriteMovies = response.filter((movie: { _id: any }) => this.user.Favourites.indexOf(movie._id) >= 0)
      })
    })
  }

  /**
   * This method will send the form inputs to the backend
   * @param void
   * @returns user object
   * @memberof ProfileViewComponent
   * @see FetchApiDataService.editUser()
   * @example editUser()
   */
  //This function allows user to edit their profile info
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((data) => {
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('Username', data.Username);
      this.snackBar.open('Your information has been updated.', 'OK', {
        duration: 2000
      })
      window.location.reload();
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      })
    });
  }

  /**
   * This method will send the user object to the backend to be deleted
   * @param void
   * @returns user object
   * @memberof ProfileViewComponent
   * @see FetchApiDataService.deleteUser()
   * @example deleteUser()
   * 
   */
  //This function allows user to delete their account permanently and return to the welcome screen
  deleteUser(): void {
    if (confirm('Are you sure?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have successfully deleted your account. Bye, bye!',
          'OK',
          {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        localStorage.clear();
      });
    }
  }
}
