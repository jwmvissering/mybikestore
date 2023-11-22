import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-overview-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './overview-item.component.html',
  styleUrl: './overview-item.component.scss'
})
export class OverviewItemComponent {

}
