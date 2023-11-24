import {Component, inject, Inject, OnInit} from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar, MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef
} from '@angular/material/snack-bar';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction
  ],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  public message: string;
  public closeButton: boolean;
  public snackBar: MatSnackBar;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    if (data) {
      this.message = data.message;
      this.closeButton = data.closeButton;
      this.snackBar = data.snackBar;
    }
  }

  public dismiss(): void {
    this.snackBar.dismiss();
  }
}
