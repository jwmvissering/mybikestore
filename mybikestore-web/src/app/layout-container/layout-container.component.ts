import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {StatisticsComponent} from "./statistics/statistics.component";

@Component({
  selector: 'app-layout-container',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, StatisticsComponent],
  templateUrl: './layout-container.component.html',
  styleUrl: './layout-container.component.scss'
})
export class LayoutContainerComponent {

}
