import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Params, Router, RouterLink} from '@angular/router';
import {InventoryFilterComponent} from "../inventory/inventory-filter/inventory-filter.component";
import {InventoryListItemComponent} from "../inventory/inventory-list-item/inventory-list-item.component";
import {BackButtonComponent} from "../shared/components/back-button/back-button.component";
import {MatTooltipModule} from '@angular/material/tooltip';
import {BikeModel} from "../shared/models/bike.model";
import {BikeService, numberPattern} from "../shared/services/bike.service";
import {MatDialog} from "@angular/material/dialog";
import {take} from "rxjs";
import {snackBarClass, SnackbarService} from "../shared/services/snackbar.service";
import {FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CategoryModel, CategoryName} from "../shared/models/category.model";
import {BrandModel} from "../shared/models/brand.model";
import {BrandService} from "../shared/services/brand.service";
import {CategoryService} from "../shared/services/category.service";
import {BikeImageComponent} from "../shared/components/bike-image/bike-image.component";

@Component({
  selector: 'app-edit-bike',
  standalone: true,
  imports: [CommonModule, RouterLink, InventoryFilterComponent, InventoryListItemComponent, BackButtonComponent,
    MatTooltipModule, ReactiveFormsModule, BikeImageComponent],
  templateUrl: './edit-bike.component.html',
  styleUrl: './edit-bike.component.scss'
})
export class EditBikeComponent implements OnInit {
  bike: BikeModel | undefined;
  form: FormGroup;
  brands: BrandModel[];
  categories: CategoryModel[];
  fileData: File;
  previewUrl: any;

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
    if (this.fileData) {
      formData.append('image', this.fileData);
    }
    this.bikeService.updateBike(this.bike!.id, formData).subscribe(() => {
      this.router.navigate(['../'], {relativeTo: this.route}).catch();
      this.snackbarService.openSnackbar('The bike has been updated', snackBarClass.success)
    }, (error) => this.snackbarService.openSnackbar(error, snackBarClass.danger))
  }

  onFileChange(fileInput: any): void {
    this.fileData = fileInput.target.files[0];
    this.preview();
  }

  preview(): void {
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
    };
  }
}
