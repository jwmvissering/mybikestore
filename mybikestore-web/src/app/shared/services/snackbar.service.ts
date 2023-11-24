import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {SnackbarComponent} from "../components/snackbar/snackbar.component";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) {
  }

  openSnackbar(message: string,
               panelClass: snackBarClass = snackBarClass.info,
               duration: number = 4000,
               verticalPosition: MatSnackBarVerticalPosition = 'bottom',
               closeButton: boolean = true): void {
    this.snackbar.openFromComponent(SnackbarComponent, {
      duration,
      panelClass,
      verticalPosition,
      data: {
        message,
        closeButton,
        snackBar: this.snackbar
      }
    });
  }
}

export enum snackBarClass {
  info = 'snackbar-info',
  warning = 'snackbar-warning',
  danger = 'snackbar-danger',
  success = 'snackbar-success'
}
