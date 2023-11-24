import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, ReplaySubject, tap} from 'rxjs';
import {RequestObject} from '../models/request-object.model';
import {environment} from '../../../environments/environment';
import {CategoryModel} from "../models/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private entityPath: string = 'categories';
  public categories: ReplaySubject<CategoryModel[]> = new ReplaySubject<CategoryModel[]>();

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<CategoryModel[]> {
    return this.categories;
  }

  loadCategoriesIntoCache(): Observable<CategoryModel[]> {
    return this.http.get<RequestObject<CategoryModel[]>>(environment.apiUrl + this.entityPath)
      .pipe(
        map((data: RequestObject<CategoryModel[]>) => data.data),
        map((data: any) => data?.map((category: CategoryModel) => new CategoryModel(category))),
        tap((data: CategoryModel[]) => this.categories.next(data))
      );
  }

  getCategory(id: number): Observable<CategoryModel> {
    return this.http.get<RequestObject<CategoryModel>>(environment.apiUrl + this.entityPath + '/' + id)
      .pipe(
        map((data: RequestObject<CategoryModel>) => data.data),
        map((category: any) => new CategoryModel(category))
      );
  }
}
