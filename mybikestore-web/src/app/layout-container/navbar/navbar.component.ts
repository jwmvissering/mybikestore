import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {GenericModalComponent} from "../../shared/components/generic-modal/generic-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {BikeService} from "../../shared/services/bike.service";
import {snackBarClass, SnackbarService} from "../../shared/services/snackbar.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private dialog: MatDialog, private bikeService: BikeService, private router: Router, private snackbarService: SnackbarService) {
  }

  resetData(): void {
    const dialogRef = this.dialog.open(GenericModalComponent, {
      data: {
        title: 'Reset all data',
        description: 'Are you sure you want to reset all data? Your progress will be lost, and the dummy data, which contains 11 bikes, will be restored.',
        cancelButtonText: 'Cancel',
        showContinueButton: true,
        continueButtonText: 'Reset'
      },
      width: '400px',
      maxWidth: '90vw',
      maxHeight: '80vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const loadingDialog = this.dialog.open(GenericModalComponent, {
          data: {
            title: 'Loading dummy data',
            description: 'This process should not take more than 5 seconds...',
            showLoadingIcon: true,
            showCancelButton: false,
            showContinueButton: false,
          },
          width: '400px',
          maxWidth: '90vw',
          maxHeight: '80vh',
          disableClose: true
        });
        this.bikeService.runBackendSeeders().subscribe(() => {
          this.bikeService.getBikesFromApi().subscribe(() => {
            this.router.navigate(['']).catch();
            loadingDialog.close();
            this.snackbarService.openSnackbar('The data has been reset', snackBarClass.success);
          });
        });
      }
    });
  }
}
