import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {BackButtonComponent} from "../shared/components/back-button/back-button.component";
import {BikeFormComponent, BikeFormSubmitEvent} from "../shared/components/bike-form/bike-form.component";
import {FormGroup, Validators} from "@angular/forms";
import {BikeService} from "../shared/services/bike.service";
import {snackBarClass, SnackbarService} from "../shared/services/snackbar.service";
import {BikeModel} from "../shared/models/bike.model";

@Component({
  selector: 'app-add-bike',
  standalone: true,
  imports: [CommonModule, RouterLink, BackButtonComponent, BikeFormComponent],
  templateUrl: './add-bike.component.html',
  styleUrl: './add-bike.component.scss'
})
export class AddBikeComponent implements OnInit {
  form: FormGroup;

  constructor(private route: ActivatedRoute, private bikeService: BikeService,
              private router: Router, private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.bikeService.createForm();
    this.form.get('image')?.setValidators([Validators.required]);
  }

  createBike(eventData: BikeFormSubmitEvent): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const formData = this.bikeService.getFormDataFromForm(this.form, eventData.electricBikeSelected);
    if (eventData.fileData) {
      formData.append('image', eventData.fileData);
    }
    this.bikeService.createBike(formData).subscribe((bike: BikeModel) => {
      this.router.navigate(['/inventory', bike.id], {relativeTo: this.route}).catch();
      this.snackbarService.openSnackbar('The bike has been added', snackBarClass.success)
    }, (error) => this.snackbarService.openSnackbar(error, snackBarClass.danger))
  }
}
