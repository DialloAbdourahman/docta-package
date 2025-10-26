import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class LocalizedExpertiseDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string | null;
}

export class CreateExpertiseDto {
  @ValidateNested()
  @Type(() => LocalizedExpertiseDto)
  en!: LocalizedExpertiseDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedExpertiseDto)
  fr?: LocalizedExpertiseDto;
}

export class UpdateExpertiseDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedExpertiseDto)
  en?: LocalizedExpertiseDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedExpertiseDto)
  fr?: LocalizedExpertiseDto;
}
