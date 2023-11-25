import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, finalize, map, Observable, ReplaySubject, take, tap} from 'rxjs';
import {BikeModel} from '../models/bike.model';
import {RequestObject} from '../models/request-object.model';
import {environment} from '../../../environments/environment';
import {InventoryFilters} from "../../inventory/inventory-filter/inventory-filter.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

export const pricePattern: RegExp = /^-?[0-9]\d*(\.\d{1,2})?$/;
export const numberPattern: RegExp = /^(0|[1-9][0-9]*)$/;

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

  constructor(private http: HttpClient, private fb: FormBuilder) {
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

  createBike(data: any): Observable<BikeModel> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<RequestObject<BikeModel>>(environment.apiUrl + this.entityPath, data, {headers})
      .pipe(
        map((data: RequestObject<BikeModel>) => data.data),
        map((bike: any) => new BikeModel(bike)),
        tap((bike: BikeModel) => this.addBikeToSavedBikes(bike))
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
    const index: number = currentBikes.findIndex((bike) => bike.id === updatedBike.id);
    if (index !== -1) {
      // If the bike is found, overwrite it and update this.bikes with new value
      currentBikes[index] = updatedBike;
      this.bikes.next([...currentBikes]);
    }
  }

  addBikeToSavedBikes(bike: BikeModel): void {
    const currentBikes: BikeModel[] = this.bikes.getValue();
    this.bikes.next([...currentBikes, bike]);
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

  createForm(bike?: BikeModel): FormGroup {
    return this.fb.group({
      model: this.fb.control(bike ? bike.model : '', [Validators.required, Validators.maxLength(255)]),
      description: this.fb.control(bike ? bike.description : '', [Validators.maxLength(15000)]),
      brand_id: this.fb.control(bike ? bike.brand.id : null, [Validators.required]),
      category_id: this.fb.control(bike ? bike.category.id : null, [Validators.required]),
      image: this.fb.control(bike ? bike.image : ''),
      quantity_in_stock: this.fb.control(bike ? bike.quantity_in_stock : 0, [Validators.required, Validators.pattern(numberPattern), Validators.min(0), Validators.max(9999)]),
      price: this.fb.control(bike ? bike.price : 0, [Validators.required, Validators.pattern(pricePattern), Validators.min(0), Validators.max(99999.99)]),
      wh_of_motor: this.fb.control(bike ? bike.wh_of_motor : null, [Validators.pattern(numberPattern), Validators.min(0), Validators.max(9999)]),
      range_in_km: this.fb.control(bike ? bike.range_in_km : null, [Validators.pattern(numberPattern), Validators.min(0), Validators.max(9999)]),
    });
  }

  getFormDataFromForm(form: FormGroup, isElectric = false) {
    const formValues = form.getRawValue();
    const formData = new FormData();
    formData.append('model', formValues.model);
    formData.append('description', formValues.description);
    formData.append('brand_id', formValues.brand_id);
    formData.append('category_id', formValues.category_id);
    formData.append('quantity_in_stock', formValues.quantity_in_stock);
    formData.append('price', formValues.price);

    // don't append when null because formData will send 'null' as a string
    if (isElectric && formValues.wh_of_motor) {
      formData.append('wh_of_motor', formValues.wh_of_motor);
    }
    if (isElectric && formValues.range_in_km) {
      formData.append('range_in_km', formValues.range_in_km);
    }
    return formData;
  }
}
