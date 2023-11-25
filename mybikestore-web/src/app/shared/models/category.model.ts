// noinspection TypeScriptValidateTypes

export class CategoryModel {
  constructor(data?: any) {
    Object.assign(this, data);
  }

  id: number;
  name: CategoryName;
}

export enum CategoryName {
  electric = 'Electric bike',
  cityBike = 'City bike',
  hybridBike = 'Hybrid bike',
  mountainBike = 'Mountain bike',
  racingBike = 'Racing bike',
  kidsBike = 'Kids bike'
}
