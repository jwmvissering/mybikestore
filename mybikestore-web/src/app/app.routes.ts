import {Routes} from '@angular/router';
import {LayoutContainerComponent} from "./layout-container/layout-container.component";
import {BikeDetailsComponent} from "./bike-details/bike-details.component";
import {InventoryComponent} from "./inventory/inventory.component";

export const routes: Routes = [
  {
    path: '', component: LayoutContainerComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'inventory'},
      {
        path: 'inventory', children: [
          {path: '', pathMatch: 'full', component: InventoryComponent},
          {
            path: ':id', children: [
              {path: '', pathMatch: 'full', component: BikeDetailsComponent}
            ]
          }
        ]
      }
    ]
  }
];
