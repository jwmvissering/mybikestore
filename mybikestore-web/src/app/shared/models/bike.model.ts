import {environment} from "../../../environments/environment";
import {CategoryModel} from "./category.model";
import {BrandModel} from "./brand.model";
// noinspection TypeScriptValidateTypes

export class BikeModel {
  constructor(data?: any) {
    Object.assign(this, data);
    if (data.createdAt) {
      this.createdAt = new Date(data.createdAt);
    }
    if (data.updatedAt) {
      this.updatedAt = new Date(data.updatedAt);
    }
    if (data.image) {
      this.image = environment.backendUrl + data.image;
    }
  }

  id: string;
  model: string;
  description: string;
  brand: BrandModel;
  category: CategoryModel;
  image: string;
  quantity_in_stock: number;
  price: number;
  wh_of_motor: number;
  range_in_km: number;
  createdAt: Date;
  updatedAt: Date;

  get name(): string {
    return this.brand ? this.brand.name + ' ' + this.model : this.model;
  }

  get stockQuantityColor(): string {
    return this.quantity_in_stock <= 0 ? 'danger' : this.quantity_in_stock === 1 ? 'warning' : 'success';
  }
}
