import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, ReplaySubject, tap} from 'rxjs';
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
  }

  getBrands(): Observable<BrandModel[]> {
    return this.brands;
  }

  loadBrandsIntoCache(): Observable<BrandModel[]> {
    return this.http.get<RequestObject<BrandModel[]>>(environment.apiUrl + this.entityPath)
      .pipe(
        map((data: RequestObject<BrandModel[]>) => data.data),
        map((data: any) => data?.map((brand: BrandModel) => new BrandModel(brand))),
        tap((data: BrandModel[]) => this.brands.next(data))
      );
  }

  getBrand(id: number): Observable<BrandModel> {
    return this.http.get<RequestObject<BrandModel>>(environment.apiUrl + this.entityPath + '/' + id)
      .pipe(
        map((data: RequestObject<BrandModel>) => data.data),
        map((brand: any) => new BrandModel(brand))
      );
  }
}
