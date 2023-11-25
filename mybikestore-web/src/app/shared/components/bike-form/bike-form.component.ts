import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BikeImageComponent} from "../bike-image/bike-image.component";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {BikeModel} from "../../models/bike.model";
import {CategoryModel, CategoryName} from "../../models/category.model";
import {BrandModel} from "../../models/brand.model";
import {BrandService} from "../../services/brand.service";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-bike-form',
  standalone: true,
  imports: [CommonModule, BikeImageComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './bike-form.component.html',
  styleUrl: './bike-form.component.scss'
})
export class BikeFormComponent implements OnInit{
  @Input() bike: BikeModel | null;
  @Input() form: FormGroup;
  @Output() submitEvent: EventEmitter<BikeFormSubmitEvent> = new EventEmitter<BikeFormSubmitEvent>();
  brands: BrandModel[];
  categories: CategoryModel[];
  previewUrl: any;
  fileData: File;

  constructor(private brandService: BrandService, private categoryService: CategoryService) {
  }

  get electricBikeSelected(): boolean {
    const selectedCategory = this.categories?.find(category => category.id === +this.form?.get('category_id')?.value);
    return selectedCategory?.name === CategoryName.electric;
  }

  ngOnInit() {
    this.brandService.getBrands().subscribe((brands: BrandModel[]) => this.brands = brands);
    this.categoryService.getCategories().subscribe((categories: CategoryModel[]) => this.categories = categories);
  }

  submit(): void {
    this.submitEvent.next({
      electricBikeSelected: this.electricBikeSelected,
      fileData: this.fileData
    });
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

export interface BikeFormSubmitEvent {
  electricBikeSelected: boolean,
  fileData: File
}
