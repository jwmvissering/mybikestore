import {Component, Input} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-bike-image',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './bike-image.component.html',
  styleUrls: ['./bike-image.component.scss']
})
export class BikeImageComponent {
  @Input() imagePath: string;
  @Input() previewImage: string;
  @Input() alt: string;
}
