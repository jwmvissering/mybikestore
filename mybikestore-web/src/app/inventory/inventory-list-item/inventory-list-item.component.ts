import {Component, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BikeModel} from "../../shared/models/bike.model";

@Component({
  selector: 'app-inventory-list-item',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTooltipModule, NgOptimizedImage],
  templateUrl: './inventory-list-item.component.html',
  styleUrl: './inventory-list-item.component.scss'
})
export class InventoryListItemComponent {
  @Input() bike: BikeModel;
}
