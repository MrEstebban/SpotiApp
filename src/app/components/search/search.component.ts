import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  artistas: any[] = [];
  loading: boolean;

  constructor(private spotify: SpotifyService) {}

  ngOnInit(): void {}

  buscar(termino: string): any {
    this.loading = true;

    if (!this.spotify.token) {
      this.spotify.getToken().then((token: string) => {
        this.spotify.getArtista(termino, token).subscribe((data) => {
          this.artistas = data.artists.items;
          this.loading = false;
        });
      });
    } else {
      console.log('No volvimos a hacer peticion al servidor!!!!');
      this.spotify.getArtista(termino).subscribe((data) => {
        this.artistas = data.artists.items;
        this.loading = false;
      });
    }

    // this.spotify.getArtista(termino).subscribe(data => {
    //   setTimeout(() => {
    //     this.artistas = data;
    //     this.loading = false;
    //   }, 500);
    // });
  }
}
