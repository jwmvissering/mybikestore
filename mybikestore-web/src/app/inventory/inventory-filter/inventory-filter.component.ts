import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {BrandModel} from "../../shared/models/brand.model";
import {CategoryModel} from "../../shared/models/category.model";
import {BrandService} from "../../shared/services/brand.service";
import {CategoryService} from "../../shared/services/category.service";
import {BikeService} from "../../shared/services/bike.service";

@Component({
  selector: 'app-inventory-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatCheckboxModule, MatSelectModule, MatInputModule],
  templateUrl: './inventory-filter.component.html',
  styleUrl: './inventory-filter.component.scss'
})
export class InventoryFilterComponent {
  brands: BrandModel[] = [];
  categories: CategoryModel[] = [];
  filters!: InventoryFilters;

  constructor(private brandService: BrandService, private categoryService: CategoryService, private bikeService: BikeService) {
    this.bikeService.getFilters().subscribe((filters: InventoryFilters) => this.filters = filters);
    this.brandService.getBrands().subscribe((brands: BrandModel[]) => this.brands = brands);
    this.categoryService.getCategories().subscribe((categories: CategoryModel[]) => this.categories = categories);
  }

  get filterIsActive(): boolean {
    return !!this.filters.brand || !!this.filters.category;
  }

  setBrandFilter(event: MatSelectChange): void {
    this.filters.brand = event.value;
    this.bikeService.setFilters(this.filters);
  }

  setCategoryFilter(event: MatSelectChange): void {
    this.filters.category = event.value;
    this.bikeService.setFilters(this.filters);
  }

  clearFilters(): void {
    this.bikeService.setFilters({brand: null, category: null});
  }
}

export interface InventoryFilters {
  brand: number | null;
  category: number | null;
}
