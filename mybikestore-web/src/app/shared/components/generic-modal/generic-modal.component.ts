import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BikeImageComponent} from "../bike-image/bike-image.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-generic-modal',
  standalone: true,
  templateUrl: './generic-modal.component.html',
  imports: [
    CommonModule,
    BikeImageComponent
  ],
  styleUrls: ['./generic-modal.component.scss']
})
export class GenericModalComponent {
  title: string;
  image: string;
  description: string;
  continueButtonText: string;
  cancelButtonText: string;
  showCancelButton: boolean;
  showContinueButton: boolean;

  constructor(public dialogRef: MatDialogRef<GenericModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.description = data.description;
    this.image = data.image;
    this.continueButtonText = data.continueButtonText || 'Doorgaan';
    this.cancelButtonText = data.cancelButtonText || 'Annuleren';
    this.showCancelButton = data.showCancelButton ?? true;
    this.showContinueButton = data.showContinueButton ?? true;
  }
}
