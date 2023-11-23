import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable, of, ReplaySubject, tap} from 'rxjs';
import {BikeModel} from '../models/bike.model';
import {RequestObject} from '../models/request-object.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private entityPath: string = 'bikes';
  private cachedBikes: BikeModel[] = [];
  private bikes: ReplaySubject<BikeModel[]> = new ReplaySubject<BikeModel[]>(); // todo: delete or save cached into replaysubject

  constructor(private http: HttpClient) {
  }

  public get hasCachedBikes(): boolean {
    return !!this.cachedBikes.length;
  }

  getBikes(): Observable<BikeModel[]> {
    return of(this.cachedBikes);
  }

  loadBikesIntoCache(): Observable<BikeModel[]> {
    return this.http.get<RequestObject<BikeModel[]>>(environment.apiUrl + this.entityPath)
      .pipe(
        map((data: RequestObject<BikeModel[]>) => data.data),
        map((data: any) => data?.map((bike: BikeModel) => new BikeModel(bike))),
        tap((data: BikeModel[]) => this.cachedBikes = data),
        tap((data: BikeModel[]) => this.bikes.next(this.cachedBikes))
      );
  }

  getBike(id: string): Observable<BikeModel> {
    return this.http.get<RequestObject<BikeModel>>(environment.apiUrl + this.entityPath + '/' + id)
      .pipe(
        map((data: RequestObject<BikeModel>) => data.data),
        map((bike: any) => new BikeModel(bike))
      );
  }

  getBikeFromCache(id: string): BikeModel | undefined {
    return this.cachedBikes.find((item) => item.id == id);
  }

  createBike(data: FormData): Observable<BikeModel> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<RequestObject<BikeModel>>(environment.apiUrl + this.entityPath, data, {headers})
      .pipe(
        map((data: RequestObject<BikeModel>) => data.data),
        map((bike: any) => new BikeModel(bike))
      );
  }

  updateBike(id: string, data: any): Observable<BikeModel> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<RequestObject<BikeModel>>(environment.apiUrl + this.entityPath + '/' + id, data, {
      params: {_method: 'PATCH'},
      headers
    })
      .pipe(
        map((data: RequestObject<BikeModel>) => data.data),
        map((bike: any) => new BikeModel(bike))
      );
  }

  deleteBike(id: string) {
    return this.http.delete<any>(environment.apiUrl + this.entityPath + '/' + id);
  }
}
