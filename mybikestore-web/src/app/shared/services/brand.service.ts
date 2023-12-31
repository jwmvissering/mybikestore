import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, ReplaySubject, take, tap} from 'rxjs';
import {RequestObject} from '../models/request-object.model';
import {environment} from '../../../environments/environment';
import {BrandModel} from "../models/brand.model";

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private entityPath: string = 'brands';
  public brands: ReplaySubject<BrandModel[]> = new ReplaySubject<BrandModel[]>();

  constructor(private http: HttpClient) {
    this.getBrandsFromApi().subscribe();
  }

  getBrands(): Observable<BrandModel[]> {
    return this.brands;
  }

  getBrandsFromApi(): Observable<BrandModel[]> {
    return this.http.get<RequestObject<BrandModel[]>>(environment.apiUrl + this.entityPath)
      .pipe(
        map((data: RequestObject<BrandModel[]>) => data.data),
        map((data: any) => data?.map((brand: BrandModel) => new BrandModel(brand))),
        tap((data: BrandModel[]) => this.brands.next(data))
      );
  }
}
