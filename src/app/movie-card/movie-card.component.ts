import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  //This method is called when Angular is done creating the component.
  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  showGenre(name: string, description: string): void {
    this.dialog.closeAll();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      dialogTitle: name,
      dialogContent: description,
    };
    dialogConfig.width = '40vw';
    dialogConfig.panelClass = 'custom-dialog-class';
    this.dialog.open(InfoDialogComponent, dialogConfig);
  }

  showDirector(name: string, bio: string): void {
    this.dialog.closeAll();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      dialogTitle: name,
      dialogContent: bio,
    };
    dialogConfig.width = '40vw';
    dialogConfig.panelClass = 'custom-dialog-class';
    this.dialog.open(InfoDialogComponent, dialogConfig);
  }

  showSynopsis(title: string, description: string): void {
    this.dialog.closeAll();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      dialogTitle: title,
      dialogContent: description,
    };
    dialogConfig.width = '40vw';
    dialogConfig.panelClass = 'custom-dialog-class';
    this.dialog.open(InfoDialogComponent, dialogConfig);
  }

  toggleFavourite(movie: any): void {
    // Toggle the favourite status of the movie
    if (this.isFavouriteMovie(movie)) {
      // Remove the movie from favourites locally
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.Favourites = user.Favourites.filter((id: string) => id !== movie._id);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      // Add the movie to favourites locally
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.Favorites.push(movie._id);
      localStorage.setItem('user', JSON.stringify(user));

      // Add the movie to favourites on the backend server
      this.fetchApiData.addFavouriteMovie(movie._id).subscribe(
        () => {
          console.log('Movie added to favourites successfully.');
        },
        (error) => {
          console.error('Error adding movie to favourites:', error);
        }
      );
    }

    // Update the local 'isFavourite' property to reflect the change
    movie.isFavourite = !this.isFavouriteMovie(movie);
  }


  // Function to check if a movie is in favourites
  isFavouriteMovie(movie: any): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.Favourites && user.Favourites.includes(movie._id);
  }
}
