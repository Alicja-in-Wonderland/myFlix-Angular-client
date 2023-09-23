import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar) { }

  //This method is called when Angular is done creating the component.
  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  addFavourite(id: string): void {
    this.fetchApiData.addFavouriteMovie(id).subscribe((result) => {

      this.snackBar.open('Added to favourites.', 'OK', {
        duration: 2000
      });
    });
  }

  isFavourite(id: string): boolean {
    return this.fetchApiData.isFavouriteMovie(id);
  }

  removeFavourite(id: string): void {
    this.fetchApiData.deleteFavouriteMovie(id).subscribe((result) => {
      this.snackBar.open('Removed from favourites.', 'OK', {
        duration: 2000
      });
    });
  }
}
