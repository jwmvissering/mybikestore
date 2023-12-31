import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Params, Router, RouterLink} from '@angular/router';
import {InventoryFilterComponent} from "../inventory/inventory-filter/inventory-filter.component";
import {InventoryListItemComponent} from "../inventory/inventory-list-item/inventory-list-item.component";
import {BackButtonComponent} from "../shared/components/back-button/back-button.component";
import {MatTooltipModule} from '@angular/material/tooltip';
import {BikeModel} from "../shared/models/bike.model";
import {BikeService} from "../shared/services/bike.service";
import {MatDialog} from "@angular/material/dialog";
import {finalize, take} from "rxjs";
import {GenericModalComponent} from "../shared/components/generic-modal/generic-modal.component";
import {snackBarClass, SnackbarService} from "../shared/services/snackbar.service";
import {CategoryName} from "../shared/models/category.model";
import {BikeImageComponent} from "../shared/components/bike-image/bike-image.component";

@Component({
  selector: 'app-bike-details',
  standalone: true,
  imports: [CommonModule, RouterLink, InventoryFilterComponent, InventoryListItemComponent, BackButtonComponent,
    MatTooltipModule, BikeImageComponent],
  templateUrl: './bike-details.component.html',
  styleUrl: './bike-details.component.scss'
})
export class BikeDetailsComponent implements OnInit {
  bike: BikeModel | undefined;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private bikeService: BikeService, private dialog: MatDialog,
              private router: Router, private snackbarService: SnackbarService) {
  }

  get pageTitle(): string {
    if (this.loading) {
      return 'Loading bike';
    }
    return this.bike?.name ?? 'Bike not found';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params): void => {
      if (params['id']) {
        this.getBike(params['id']);
      }
    })
  }

  getBike(id: number): void {
    this.bikeService.getBike(id)
      .pipe(take(1), finalize(() => this.loading = false))
      .subscribe((bike: BikeModel): void => {
        this.bike = bike;
      });
  }

  openImageDialog(): void {
    this.dialog.open(GenericModalComponent, {
      data: {
        image: this.bike!.image,
        cancelButtonText: 'Close',
        showContinueButton: false
      },
      width: '900px',
      maxWidth: '90vw',
      maxHeight: '80vh'
    });
  }

  deleteBike(): void {
    const dialogRef = this.dialog.open(GenericModalComponent, {
      data: {
        title: 'Are you sure you want to delete this bike?',
        cancelButtonText: 'Cancel',
        showContinueButton: true,
        continueButtonText: 'Delete'
      },
      width: '300px',
      maxWidth: '90vw',
      maxHeight: '80vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bikeService.deleteBike(this.bike!.id).subscribe((): void => {
          this.router.navigate(['/']).catch();
          this.snackbarService.openSnackbar(this.bike!.name + ' has been deleted', snackBarClass.success);
        });
      }
    })
  }

  lowerQuantity() {
    this.bike!.quantity_in_stock--;
    this.bikeService.changeQuantity(this.bike!.id, this.bike!.quantity_in_stock).subscribe(() => {
      this.snackbarService.openSnackbar('The quantity has been updated', snackBarClass.success);
    });
  }

  addQuantity() {
    this.bike!.quantity_in_stock++;
    this.bikeService.changeQuantity(this.bike!.id, this.bike!.quantity_in_stock).subscribe(() => {
      this.snackbarService.openSnackbar('The quantity has been updated', snackBarClass.success);
    });
  }

  protected readonly CategoryName = CategoryName;
}
