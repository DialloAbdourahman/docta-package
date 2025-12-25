import { IsNumber, IsString, Min, Max } from "class-validator";

export class CreateRatingDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsString()
  message!: string;
}
