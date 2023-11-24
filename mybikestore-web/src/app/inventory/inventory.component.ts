import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatisticsComponent} from "../layout-container/statistics/statistics.component";
import {InventoryFilterComponent} from "./inventory-filter/inventory-filter.component";
import {InventoryListItemComponent} from "./inventory-list-item/inventory-list-item.component";
import {BikeService} from "../shared/services/bike.service";
import {BikeModel} from "../shared/models/bike.model";
import {BrandService} from "../shared/services/brand.service";
import {CategoryService} from "../shared/services/category.service";

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, StatisticsComponent, InventoryFilterComponent, InventoryListItemComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {
  bikes: BikeModel[] = [];

  constructor(private bikeService: BikeService, private brandsService: BrandService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getBikes();
  }

  getBikes() {
    this.bikeService.getFilteredBikes().subscribe((bikes: BikeModel[]) => {
      this.bikes = bikes;
      this.brandsService.getBrandsFromApi().subscribe();
      this.categoryService.getCategoriesFromApi().subscribe();
    })
  }
}
