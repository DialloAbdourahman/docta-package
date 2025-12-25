import { IsNumber, IsString, Min, Max, IsOptional } from "class-validator";

export class CreateRatingDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsString()
  message!: string;
}

export class UpdateRatingDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating!: number;

  @IsString()
  @IsOptional()
  message!: string;
}
