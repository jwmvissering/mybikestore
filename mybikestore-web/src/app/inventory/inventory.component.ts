import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatisticsComponent} from "../layout-container/statistics/statistics.component";
import {InventoryFilterComponent} from "./inventory-filter/inventory-filter.component";
import {InventoryListItemComponent} from "./inventory-list-item/inventory-list-item.component";
import {BikeService} from "../shared/services/bike.service";
import {BikeModel} from "../shared/models/bike.model";

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, StatisticsComponent, InventoryFilterComponent, InventoryListItemComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {
  bikes: BikeModel[] = [];
  hasFilters: boolean = false;
  loading: boolean = true

  constructor(private bikeService: BikeService) {
  }

  ngOnInit(): void {
    this.getBikes();
  }

  getBikes(): void {
    this.bikeService.forceRefresh();
    this.bikeService.getBikes(true).subscribe((bikes: BikeModel[]) => {
      this.bikes = bikes;
      this.loading = false;
      this.bikeService.getFilters().subscribe(filters => {
        this.hasFilters = Object.values(filters).some(value => !!value);
      })
    })
  }
}
