import { IPosition } from "../../models";

export class PositionOutputDto {
  startDate: number;
  endDate: number | null;
  title: string;
  company: string;

  constructor(pos: IPosition) {
    this.startDate = pos.startDate;
    this.endDate = pos.endDate ?? null;
    this.title = pos.title;
    this.company = pos.company;
  }
}
