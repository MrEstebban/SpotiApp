import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  loading: boolean;
  nuevasCanciones: any[] = [];
  error: boolean = false;
  mensajeError: string;

  constructor(private servicio: SpotifyService) {
    this.loading = true;

    if (!this.servicio.token) {
      //Si no se ha generado un token

      servicio.getToken().then((token: string) => {
        servicio.getNewReleases(token).subscribe(
          (data: any) => {
            this.nuevasCanciones = data.albums.items;
            this.loading = false;
          },
          (errorSubscribe) => {
            this.error = true;
            this.loading = false;
            this.mensajeError = errorSubscribe.error.error.message;
          }
        );
      });
    } else {
      console.log('No volvimos a hacer peticion al servidor!!!!');
      servicio.getNewReleases().subscribe(
        (data: any) => {
          this.nuevasCanciones = data.albums.items;
          this.loading = false;
          // console.log(this.nuevasCanciones);
        },
        (errorSubscribe) => {
          this.error = true;
          this.loading = false;
          this.mensajeError = errorSubscribe.error.error.message;
        }
      );
    }

    // servicio.getNewReleases().subscribe((data: any) => {
    //   this.nuevasCanciones = data;
    //   this.loading = false;
    //   // console.log(this.nuevasCanciones);
    // }, (errorSubscribe) => {
    //   this.error = true;
    //   this.loading = false;
    //   this.mensajeError = errorSubscribe.error.error.message;
    // });
  }

  ngOnInit(): void {}
}
