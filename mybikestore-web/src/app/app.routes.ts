import {Routes} from '@angular/router';
import {LayoutContainerComponent} from "./layout-container/layout-container.component";
import {OverviewComponent} from "./overview/overview.component";
import {ItemDetailsComponent} from "./item-details/item-details.component";

export const routes: Routes = [
  {
    path: '', component: LayoutContainerComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'overview'},
      {path: 'overview', component: OverviewComponent},
      {
        path: ':id', children: [
          {path: '', pathMatch: 'full', component: ItemDetailsComponent},
          // {path: 'edit', component: ItemEditComponent}
        ]
      }
    ]
  }
];
