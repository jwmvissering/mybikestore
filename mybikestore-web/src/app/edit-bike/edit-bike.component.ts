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
import {take} from "rxjs";
import {GenericModalComponent} from "../shared/components/generic-modal/generic-modal.component";
import {snackBarClass, SnackbarService} from "../shared/services/snackbar.service";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CategoryModel, CategoryName} from "../shared/models/category.model";
import {BrandModel} from "../shared/models/brand.model";
import {BrandService} from "../shared/services/brand.service";
import {CategoryService} from "../shared/services/category.service";

@Component({
  selector: 'app-edit-bike',
  standalone: true,
  imports: [CommonModule, RouterLink, InventoryFilterComponent, InventoryListItemComponent, BackButtonComponent,
    MatTooltipModule, ReactiveFormsModule],
  templateUrl: './edit-bike.component.html',
  styleUrl: './edit-bike.component.scss'
})
export class EditBikeComponent implements OnInit {
  bike: BikeModel | undefined;
  form: FormGroup;
  brands: BrandModel[];
  categories: CategoryModel[];

  constructor(private route: ActivatedRoute, private bikeService: BikeService, private dialog: MatDialog,
              private brandService: BrandService, private categoryService: CategoryService,
              private router: Router, private snackbarService: SnackbarService) {
  }

  get electricBikeSelected(): boolean {
    const selectedCategory = this.categories?.find(category => category.id === +this.form?.get('category_id')?.value);
    return selectedCategory?.name === CategoryName.electric;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params): void => {
      if (params['id']) {
        this.getBike(params['id']);
      }
    })
  }

  getBike(id: number): void {
    this.bikeService.getBike(id).pipe(take(1)).subscribe((bike: BikeModel): void => {
      this.bike = bike;
      this.brandService.getBrands().subscribe((brands: BrandModel[]) => this.brands = brands);
      this.categoryService.getCategories().subscribe((categories: CategoryModel[]) => this.categories = categories);
      this.createForm();
    });
  }

  createForm(): void {
    this.form = this.bikeService.createForm(this.bike);
  }

  updateBike(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const formData = this.bikeService.getFormDataFromForm(this.form, this.electricBikeSelected);
    this.bikeService.updateBike(this.bike!.id, formData).subscribe(() => {
      this.router.navigate(['../'], {relativeTo: this.route}).catch();
      this.snackbarService.openSnackbar('The bike has been updated', snackBarClass.success)
    })
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
      maxHeight: '90vh'
    });
  }
}
