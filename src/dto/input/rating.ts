import { IsEnum, IsString } from "class-validator";
import { EnumRatingValue } from "../../enums/rating";

export class CreateRatingDto {
  @IsEnum(EnumRatingValue)
  rating!: EnumRatingValue;

  @IsString()
  message!: string;
}
