import { IEducation } from "../../models";

export class EducationOutputDto {
  year: number;
  title: string;

  constructor(edu: IEducation) {
    this.year = edu.year;
    this.title = edu.title;
  }
}
