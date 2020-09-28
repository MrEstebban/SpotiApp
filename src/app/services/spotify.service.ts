import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  token: string;

  constructor(private http: HttpClient) {
    console.log('Servicio listo');
  }

  getToken() {
    const promise = new Promise((resolve, reject) => {
      const urlServer =
        'https://spotiappserver-prueba.herokuapp.com/spotify';
      this.http.get(urlServer, {}).subscribe((data) => {
        this.token = data['access_token'];
        resolve(data['access_token']);
      });
    });
    return promise;
  }

  getQuery(query: string, token: string = this.token): any {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(url, { headers });
  }

  getNewReleases(token: string = this.token) {
    return this.getQuery('browse/new-releases?limit=20', token);
  }

  getArtista(termino: string, token: string = this.token) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`, token);
  }

  getInfoArtista(idArtista: string, token: string = this.token) {
    return this.getQuery(`artists/${idArtista}`, token);
    // .pipe( map((data: any) => data));
  }

  getTopTracks(idArtista: string, token: string = this.token) {
    return this.getQuery(`artists/${idArtista}/top-tracks?country=us`, token);
  }
}
