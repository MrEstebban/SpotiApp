import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  loading: boolean;
  nuevasCanciones: any[] = [];
  error: boolean = false;
  mensajeError: string;

  constructor(private servicio: SpotifyService) {
    
    this.loading = true;

    servicio.getNewReleases().subscribe((data: any) => {
      this.nuevasCanciones = data;
      this.loading = false;
      // console.log(this.nuevasCanciones);
    }, (errorSubscribe) => {
      this.error = true;
      this.loading = false;
      this.mensajeError = errorSubscribe.error.error.message;
    });
  }

  ngOnInit(): void {
  }

}
