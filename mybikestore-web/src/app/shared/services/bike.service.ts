import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, finalize, map, Observable, of, ReplaySubject, take, tap} from 'rxjs';
import {BikeModel} from '../models/bike.model';
import {RequestObject} from '../models/request-object.model';
import {environment} from '../../../environments/environment';
import {InventoryFilters} from "../../inventory/inventory-filter/inventory-filter.component";

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private entityPath: string = 'bikes';
  private bikes: BehaviorSubject<BikeModel[]> = new BehaviorSubject<BikeModel[]>([]);
  private filteredBikes: ReplaySubject<BikeModel[]> = new ReplaySubject<BikeModel[]>();
  private dataLoaded = false;
  private loading = false;
  private filters: BehaviorSubject<InventoryFilters> = new BehaviorSubject<InventoryFilters>({
    brand: null,
    category: null,
  });

  constructor(private http: HttpClient) {
  }

  getBikes(filtered = false): Observable<BikeModel[]> {
    // If data is not loaded or not already requested, fetch it
    if (!this.dataLoaded && !this.loading) {
      this.loading = true;
      this.getBikesFromApi().pipe(
        finalize(() => this.loading = false)
      ).subscribe((bikes) => {
        this.bikes.next(bikes);
        this.dataLoaded = true;
      });
    }

    if (filtered) {
      return this.filteredBikes.asObservable();
    } else {
      return this.bikes.asObservable();
    }
  }

  forceRefresh(): void {
    this.dataLoaded = false;
  }

  getBikesFromApi(): Observable<BikeModel[]> {
    return this.http.get<RequestObject<BikeModel[]>>(environment.apiUrl + this.entityPath)
      .pipe(
        map((data: RequestObject<BikeModel[]>) => data.data),
        map((data: any) => data?.map((bike: BikeModel) => new BikeModel(bike))),
        tap((data: BikeModel[]) => this.bikes.next(data)),
        tap(() => this.updateFilteredBikes()),
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

    return this.http.post<RequestObject<BikeModel>>(environment.apiUrl + this.entityPath + '/' + id, data,
      {params: {_method: 'PATCH'}, headers})
      .pipe(
        map((data: RequestObject<BikeModel>) => data.data),
        map((bike: any) => new BikeModel(bike)),
        tap((updatedBike: BikeModel) => this.updateSavedBikesWithUpdatedBike(updatedBike))
      );
  }

  changeQuantity(id: number, quantity: number) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<RequestObject<BikeModel>>(environment.apiUrl + this.entityPath + '/' + id + '/quantity', {
      quantity_in_stock: quantity
    }, {params: {_method: 'PATCH'}, headers})
      .pipe(
        map((data: RequestObject<BikeModel>) => data.data),
        map((bike: any) => new BikeModel(bike)),
        tap((updatedBike: BikeModel) => this.updateSavedBikesWithUpdatedBike(updatedBike))
      );
  }

  deleteBike(id: number): Observable<void> {
    return this.http.delete<any>(environment.apiUrl + this.entityPath + '/' + id);
  }

  updateSavedBikesWithUpdatedBike(updatedBike: BikeModel): void {
    const currentBikes: BikeModel[] = this.bikes.getValue();
    // Find the index of the bike to be updated
    const index = currentBikes.findIndex((bike) => bike.id === updatedBike.id);
    if (index !== -1) {
      // If the bike is found, update it in the array
      this.bikes.getValue()[index] = updatedBike;
      // Update the observable with the modified array
      this.bikes.next([...currentBikes]);
    }
  }

  getFilters(): Observable<{ brand: number | null, category: number | null }> {
    return this.filters;
  }

  setFilters(filters: InventoryFilters): void {
    this.filters.next(filters);
    this.updateFilteredBikes();
  }

  updateFilteredBikes(): void {
    const filters = this.filters.getValue();
    this.bikes.pipe(take(1)).subscribe((bikes: BikeModel[]) => {
      this.filteredBikes.next(bikes.filter((bike: BikeModel) => {
        const brandMatch = filters.brand === null || bike.brand?.id === filters.brand;
        const categoryMatch = filters.category === null || bike.category?.id === filters.category;
        return brandMatch && categoryMatch;
      }));
    });
  }
}
