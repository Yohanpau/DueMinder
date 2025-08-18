import { IsNotEmpty, IsString, IsNumber, IsPositive, IsDateString, Min, Max } from 'class-validator';

export class CreateBillDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsDateString()
  dueDate: string;

  @IsNumber()
  @Min(1)
  @Max(3)
  priority: number; // 1 = high, 2 = medium, 3 = low
}
