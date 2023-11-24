import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Statistics, StatisticsService} from "../../shared/services/statistics.service";

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit {
  statistics: Statistics;

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.statisticsService.getStatistics().subscribe((statistics: Statistics): void => {
      this.statistics = statistics;
    });
  }
}
