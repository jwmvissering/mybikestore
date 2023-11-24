import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable, ReplaySubject, take, tap} from 'rxjs';
import {BikeModel} from '../models/bike.model';
import {RequestObject} from '../models/request-object.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private entityPath: string = 'bikes';
  public bikes: ReplaySubject<BikeModel[]> = new ReplaySubject<BikeModel[]>();
  public filteredBikes: ReplaySubject<BikeModel[]> = new ReplaySubject<BikeModel[]>();
  private filters:{
    brand: number | null,
    category: number | null,
  } = {
    brand: null,
    category: null,
  };

  constructor(private http: HttpClient) {
  }

  getBikes(): Observable<BikeModel[]> {
    return this.filteredBikes;
  }

  loadBikesIntoCache(): Observable<BikeModel[]> {
    return this.http.get<RequestObject<BikeModel[]>>(environment.apiUrl + this.entityPath)
      .pipe(
        map((data: RequestObject<BikeModel[]>) => data.data),
        map((data: any) => data?.map((bike: BikeModel) => new BikeModel(bike))),
        tap((data: BikeModel[]) => this.filteredBikes.next(data)),
        tap((data: BikeModel[]) => this.bikes.next(data))
      );
  }

  getBike(id: number): Observable<BikeModel> {
    return this.http.get<RequestObject<BikeModel>>(environment.apiUrl + this.entityPath + '/' + id)
      .pipe(
        map((data: RequestObject<BikeModel>) => data.data),
        map((bike: any) => new BikeModel(bike))
      );
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

  updateBike(id: number, data: any): Observable<BikeModel> {
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

  deleteBike(id: number): Observable<void> {
    return this.http.delete<any>(environment.apiUrl + this.entityPath + '/' + id);
  }

  setBrandFilter(brandId: number | null) {
    this.filters.brand = brandId;
    this.updateFilteredBikes();
  }

  setCategoryFilter(categoryId: number | null) {
    this.filters.category = categoryId;
    this.updateFilteredBikes();
  }

  updateFilteredBikes(): void {
    this.bikes.pipe(take(1)).subscribe((bikes: BikeModel[]) => {
      this.filteredBikes.next(bikes.filter(bike => {
        const brandMatch = this.filters.brand === null || bike.brand?.id === this.filters.brand;
        const categoryMatch = this.filters.category === null || bike.category?.id === this.filters.category;

        return brandMatch && categoryMatch;
      }));
    });
  }
}
