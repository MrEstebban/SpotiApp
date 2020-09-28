import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [],
})
export class ArtistaComponent implements OnInit {
  Id: string;
  artista: any = {};
  topTracks: any[] = [];
  loading: boolean = true;

  constructor(private router: ActivatedRoute, private spotify: SpotifyService) {
    this.router.params.subscribe((params) => {
      this.Id = params.id;

      if (!this.spotify.token) {
        this.spotify.getToken().then((token: string) => {
          // Obtener informacion del artista
          this.spotify.getInfoArtista(this.Id, token).subscribe((artista) => {
            this.artista = artista;
          });

          // Obtener Top tracks del artista
          this.spotify.getTopTracks(this.Id, token).subscribe((data) => {
            this.topTracks = data.tracks;
            this.loading = false;
          });
        });
      } else {
        console.log('No volvimos a hacer peticion al servidor!!!!');
        // Obtener informacion del artista
        this.spotify.getInfoArtista(this.Id).subscribe((artista) => {
          this.artista = artista;
        });

        // Obtener Top tracks del artista
        this.spotify.getTopTracks(this.Id).subscribe((data) => {
          setTimeout(() => {
            console.log(data.tracks);

            this.topTracks = data.tracks;
            this.loading = false;
          }, 500);
        });
      }

      // // Obtener informacion del artista
      // this.spotify.getInfoArtista(this.Id).subscribe(artista => {
      //   this.artista = artista;
      // });

      // // Obtener Top tracks del artista
      // this.spotify.getTopTracks(this.Id).subscribe(tracks => {
      //   setTimeout(() => {
      //     console.log(tracks);

      //     this.topTracks = tracks;
      //     this.loading = false;
      //   }, 500);
      // });
    });
  }

  ngOnInit(): void {}
}
