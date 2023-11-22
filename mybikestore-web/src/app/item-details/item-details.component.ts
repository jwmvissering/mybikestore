import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {OverviewFilterComponent} from "../overview/overview-filter/overview-filter.component";
import {OverviewItemComponent} from "../overview/overview-item/overview-item.component";
import {BackButtonComponent} from "../shared/components/back-button/back-button.component";

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule, RouterLink, OverviewFilterComponent, OverviewItemComponent, BackButtonComponent],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss'
})
export class ItemDetailsComponent {

}
