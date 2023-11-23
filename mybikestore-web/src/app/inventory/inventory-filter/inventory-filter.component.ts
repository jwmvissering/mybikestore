import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-inventory-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatCheckboxModule, MatSelectModule, MatInputModule],
  templateUrl: './inventory-filter.component.html',
  styleUrl: './inventory-filter.component.scss'
})
export class InventoryFilterComponent {

}
