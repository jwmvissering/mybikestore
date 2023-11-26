import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {GenericModalComponent} from "../../shared/components/generic-modal/generic-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {BikeService} from "../../shared/services/bike.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private dialog: MatDialog, private bikeService: BikeService) {
  }

  resetData(): void {
    const dialogRef = this.dialog.open(GenericModalComponent, {
      data: {
        title: 'Reset all data',
        description: 'Are you sure you want to reset all data? Your progress will be lost and the dummy data containing 20 bikes will be restored.',
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
            description: 'This should not take longer than 5 seconds...',
            showLoadingIcon: true,
            showCancelButton: false,
            showContinueButton: false,
          },
          width: '400px',
          maxWidth: '90vw',
          maxHeight: '80vh'
        });
        this.bikeService.runBackendSeeders().subscribe(() => {
          this.bikeService.getBikesFromApi().subscribe();
          loadingDialog.close();
        });
      }
    });
  }
}
