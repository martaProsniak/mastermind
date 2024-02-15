export class ColorModel {
  id: string;
  color: string;
  order: number;

  constructor(id: string, colorClass: string, order: number = 0) {
    this.id = id;
    this.color = colorClass;
    this.order = order;
  }
}
