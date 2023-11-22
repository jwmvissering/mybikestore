import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-overview-item',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTooltipModule],
  templateUrl: './overview-item.component.html',
  styleUrl: './overview-item.component.scss'
})
export class OverviewItemComponent {

}
