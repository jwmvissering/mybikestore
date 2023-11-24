import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {BikeService} from "./bike.service";
import {BikeModel} from "../models/bike.model";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  statistics: ReplaySubject<Statistics> = new ReplaySubject<Statistics>();

  constructor(private bikeService: BikeService) {
  }

  getStatistics(): Observable<Statistics> {
    this.bikeService.getBikes().subscribe((bikes: BikeModel[]) => {
      this.statistics.next({
        totalValue: bikes.length ? this.getTotalValue(bikes) : 0,
        totalItems: bikes.length ? this.getTotalItems(bikes) : 0,
        outOfStock: bikes.length ? this.getOutOfStock(bikes) : 0
      })
    })
    return this.statistics;
  }

  private getTotalValue(bikes: BikeModel[]) {
    return bikes.map((bike: BikeModel) => +bike.price * bike.quantity_in_stock)
      .reduce((a: number, c: number) => a + c);
  }

  private getTotalItems(bikes: BikeModel[]) {
    return bikes.map((bike: BikeModel) => bike.quantity_in_stock)
      .reduce((a: number, c: number) => a + c);
  }

  private getOutOfStock(bikes: BikeModel[]) {
    return bikes.filter((bike: BikeModel) => bike.quantity_in_stock === 0).length;
  }
}

export interface Statistics {
  totalValue: number | undefined;
  totalItems: number | undefined;
  outOfStock: number | undefined;
}
