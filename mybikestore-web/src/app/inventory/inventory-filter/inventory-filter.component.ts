import {Component, signal} from '@angular/core';
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

  constructor(private brandService: BrandService, private categoryService: CategoryService, private bikeService: BikeService) {
    this.brandService.getBrands().subscribe((brands: BrandModel[]) => this.brands = brands);
    this.categoryService.getCategories().subscribe((categories: CategoryModel[]) => this.categories = categories);
  }

  setBrandFilter(event: MatSelectChange) {
    const selectedBrand = event.value;
    this.bikeService.setBrandFilter(selectedBrand);
  }

  setCategoryFilter(event: MatSelectChange) {
    const selectedCategory = event.value;
    this.bikeService.setCategoryFilter(selectedCategory);
  }
}
