import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class JokesApiService {
  apiUrl: string = 'https://api.api-ninjas.com/v1/jokes';

  constructor(private http: HttpClient) {
  }

  getRandomJokes(limit: number = 1): Observable<Joke[]> {
    const headers: HttpHeaders = new HttpHeaders()
      .set('X-Api-Key', environment.jokesApiKey)
      .set('Content-Type', 'application/json');

    return this.http.get<Joke[]>(this.apiUrl, {params: {limit}, headers});
  }
}

export interface Joke {
  joke: string;
}
