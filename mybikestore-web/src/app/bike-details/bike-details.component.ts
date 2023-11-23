import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ActivatedRoute, Params, RouterLink} from '@angular/router';
import {InventoryFilterComponent} from "../inventory/inventory-filter/inventory-filter.component";
import {InventoryListItemComponent} from "../inventory/inventory-list-item/inventory-list-item.component";
import {BackButtonComponent} from "../shared/components/back-button/back-button.component";
import {MatTooltipModule} from '@angular/material/tooltip';
import {BikeModel} from "../shared/models/bike.model";
import {BikeService} from "../shared/services/bike.service";
import {MatDialog} from "@angular/material/dialog";
import {take} from "rxjs";

@Component({
  selector: 'app-bike-details',
  standalone: true,
  imports: [CommonModule, RouterLink, InventoryFilterComponent, InventoryListItemComponent, BackButtonComponent, MatTooltipModule, NgOptimizedImage],
  templateUrl: './bike-details.component.html',
  styleUrl: './bike-details.component.scss'
})
export class BikeDetailsComponent implements OnInit {
  bike: BikeModel | undefined;

  constructor(private route: ActivatedRoute, private bikeService: BikeService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params): void => {
      if (params['id']) {
        this.getBike(params['id']);
      }
    })
  }

  getBike(id: string): void {
    if (this.bikeService.hasCachedBikes) {
      this.bike = this.bikeService.getBikeFromCache(id);
    } else {
      this.bikeService.getBike(id).pipe(take(1)).subscribe((bike: BikeModel): void => {
        this.bike = bike;
      });
    }
  }
}
