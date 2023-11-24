import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {take} from "rxjs";
import {BikeService} from "../shared/services/bike.service";

@Component({
  selector: 'app-layout-container',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, StatisticsComponent],
  templateUrl: './layout-container.component.html',
  styleUrl: './layout-container.component.scss'
})
export class LayoutContainerComponent implements OnInit {

  constructor(private bikeService: BikeService) {
  }

  ngOnInit() {
    // Request inside layoutContainer because statistics and inventory both need the data
    this.bikeService.getBikesFromApi().pipe(take(1)).subscribe();
  }
}
