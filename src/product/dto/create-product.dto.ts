import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    ValidateIf
} from "class-validator";

export class CreateProductDto {
  @IsNotEmpty({ message: "Provide product name" })
  @IsString({ message: "Provide product name as a string" })
  @MaxLength(50, { message: "Max length of product name should be 50." })
  @ApiProperty({
    type: String,
    description: "Name of the product.",
    example: "Product Name",
    required: true,
  })
  name!: string;

  @ValidateIf((dto: CreateProductDto) => dto.description !== undefined && dto.description !== null)
  @IsString({ message: "Provide description as a string." })
  @MaxLength(250, { message: "Max length of description should be 250." })
  @ApiProperty({
    type: String,
    description: "Description of the product.",
    example: "Product Description",
    required: false,
  })
  description?: string;

  @IsNotEmpty({ message: "Provide price." })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: "Provide price as a number." })
  @ApiProperty({
    type: Number,
    description: "Price of the product.",
    example: 73.54,
    required: true,
  })
  price!: number;

  @IsNotEmpty({ message: "Provide inventory." })
  @IsNumber({ maxDecimalPlaces: 4 }, { message: "Provide inventory as a number." })
  @ApiProperty({
    type: Number,
    description: "Inventory of the product.",
    example: 255,
    required: true,
  })
  inventory!: number;
}
