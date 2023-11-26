import {Component, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BikeModel} from "../../shared/models/bike.model";
import {BikeImageComponent} from "../../shared/components/bike-image/bike-image.component";

@Component({
  selector: 'app-inventory-list-item',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTooltipModule, NgOptimizedImage, BikeImageComponent],
  templateUrl: './inventory-list-item.component.html',
  styleUrl: './inventory-list-item.component.scss'
})
export class InventoryListItemComponent {
  @Input() bike: BikeModel;
}
