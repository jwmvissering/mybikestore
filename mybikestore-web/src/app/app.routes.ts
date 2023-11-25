import {Routes} from '@angular/router';
import {LayoutContainerComponent} from "./layout-container/layout-container.component";
import {BikeDetailsComponent} from "./bike-details/bike-details.component";
import {InventoryComponent} from "./inventory/inventory.component";
import {EditBikeComponent} from "./edit-bike/edit-bike.component";
import {AddBikeComponent} from "./add-bike/add-bike.component";

export const routes: Routes = [
  {
    path: '', component: LayoutContainerComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'inventory'},
      {
        path: 'inventory', children: [
          {path: '', pathMatch: 'full', component: InventoryComponent},
          {path: 'add', component: AddBikeComponent},
          {
            path: ':id', children: [
              {path: '', pathMatch: 'full', component: BikeDetailsComponent},
              {path: 'edit', component: EditBikeComponent},
            ]
          }
        ]
      }
    ]
  }
];
