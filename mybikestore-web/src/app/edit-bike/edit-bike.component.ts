import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Params, Router, RouterLink} from '@angular/router';
import {BackButtonComponent} from "../shared/components/back-button/back-button.component";
import {BikeModel} from "../shared/models/bike.model";
import {BikeService} from "../shared/services/bike.service";
import {snackBarClass, SnackbarService} from "../shared/services/snackbar.service";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {BikeImageComponent} from "../shared/components/bike-image/bike-image.component";
import {BikeFormComponent, BikeFormSubmitEvent} from "../shared/components/bike-form/bike-form.component";

@Component({
  selector: 'app-edit-bike',
  standalone: true,
  imports: [CommonModule, RouterLink, BackButtonComponent, ReactiveFormsModule, BikeImageComponent, BikeFormComponent],
  templateUrl: './edit-bike.component.html',
  styleUrl: './edit-bike.component.scss'
})
export class EditBikeComponent implements OnInit {
  bike: BikeModel | undefined;
  form: FormGroup;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private bikeService: BikeService,
              private router: Router, private snackbarService: SnackbarService) {
  }

  get pageTitle(): string {
    if (this.loading) {
      return 'Loading bike';
    }
    return this.bike?.name ? 'Edit ' + this.bike?.name : 'Bike not found';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params): void => {
      if (params['id']) {
        this.getBike(params['id']);
      }
    })
  }

  getBike(id: number): void {
    this.loading = true;
    this.bikeService.getBike(id).subscribe((bike: BikeModel) => {
      this.bike = bike;
      this.createForm();
      this.loading = false
    });
  }

  createForm(): void {
    this.form = this.bikeService.createForm(this.bike);
  }

  updateBike(eventData: BikeFormSubmitEvent): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const formData = this.bikeService.getFormDataFromForm(this.form, eventData.electricBikeSelected);
    if (eventData.fileData) {
      formData.append('image', eventData.fileData);
    }
    this.bikeService.updateBike(this.bike!.id, formData).subscribe(() => {
      this.router.navigate(['../'], {relativeTo: this.route}).catch();
      this.snackbarService.openSnackbar('The bike has been updated', snackBarClass.success)
    }, (error) => this.snackbarService.openSnackbar(error, snackBarClass.danger))
  }
}
