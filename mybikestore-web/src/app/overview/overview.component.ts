import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StatisticsComponent} from "../layout-container/statistics/statistics.component";
import {OverviewFilterComponent} from "./overview-filter/overview-filter.component";
import {OverviewItemComponent} from "./overview-item/overview-item.component";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, StatisticsComponent, OverviewFilterComponent, OverviewItemComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
}
