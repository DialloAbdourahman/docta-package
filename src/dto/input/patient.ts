import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Gender } from "../../enums";

export class UpdatePatientDto {
  @IsOptional()
  @IsString()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsNumber()
  dob?: number;
}
