import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatisticsComponent} from "../layout-container/statistics/statistics.component";
import {InventoryFilterComponent} from "./inventory-filter/inventory-filter.component";
import {InventoryListItemComponent} from "./inventory-list-item/inventory-list-item.component";
import {BikeService} from "../shared/services/bike.service";
import {take} from "rxjs";
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

  constructor(private bikeService: BikeService) {
  }

  ngOnInit(): void {
    this.bikeService.loadBikesIntoCache().pipe(take(1)).subscribe(() => {
      this.getBikes();
    });
  }

  getBikes() {
    this.bikeService.getBikes().subscribe((bikes: BikeModel[]) => {
      this.bikes = bikes;
      // console.log(this.bikes);
    })
  }
}
