import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify service listo');
  }

  getQuery(query: string): any{
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders(
      {
        Authorization : 'Bearer ###'// Replace with your spotify developer token
      });

    return this.http.get(url, {headers});
  }

  getNewReleases(): any{

    return this.getQuery('browse/new-releases?limit=20').pipe( map((data: any) => data.albums.items));
  }

  getArtista(termino: string): any{

    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe( map((data: any) => data.artists.items));
  }

  getInfoArtista(idArtista: string): any{
    return this.getQuery(`artists/${idArtista}`);
    // .pipe( map((data: any) => data));
  }

  getTopTracks(idArtista: string): any{
    return this.getQuery(`artists/${idArtista}/top-tracks?country=us`).pipe(map((data: any) => data.tracks));
  }
}
