// noinspection TypeScriptValidateTypes

export class CategoryModel {
  constructor(data?: any) {
    Object.assign(this, data);
  }

  id: string;
  name: string;
}
