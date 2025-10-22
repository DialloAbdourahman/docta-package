import { IsMongoId, IsNumber, Min, IsEnum, IsOptional } from "class-validator";
import { PeriodStatus } from "../../enums/period.status";

export class CreatePeriodDto {
  @IsMongoId()
  doctorId!: string;

  @IsNumber()
  @Min(0)
  startTime!: number;

  @IsNumber()
  @Min(0)
  endTime!: number;
}
