import { IFaq } from "../../models";

export class FaqOutputDto {
  title: string;
  description: string;

  constructor(f: IFaq) {
    this.title = f.title;
    this.description = f.description;
  }
}
