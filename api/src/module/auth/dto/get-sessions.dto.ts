import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
} from 'class-validator';

export class GetSessionsQueryDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly page: number = 0;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly limit: number = 10;
}
