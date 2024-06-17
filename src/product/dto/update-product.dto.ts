import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength, ValidateIf } from "class-validator";

export class UpdateProductDto {
  @IsNotEmpty({ message: "Provide product id" })
  @IsString({ message: "Provide product id as a string" })
  @IsUUID(4, { message: "Provide a valid product id" })
  @ApiProperty({
    type: String,
    description: "Id of the product.",
    example: "123e4567-e89b-12d3-a456-426614174000",
    required: true,
  })
  id!: string;

  @ValidateIf((dto: UpdateProductDto) => dto.name !== undefined && dto.name !== null)
  @IsNumber({}, { message: "Provide product name as a string" })
  @MaxLength(50, { message: "Max length of product name should be 50." })
  @ApiProperty({
    type: String,
    description: "Name of the product.",
    example: "Product Name",
    required: false,
  })
  name?: string;

  @ValidateIf((dto: UpdateProductDto) => dto.description !== undefined && dto.description !== null)
  @IsString({ message: "Provide description as a string." })
  @MaxLength(250, { message: "Max length of description should be 250." })
  @ApiProperty({
    type: String,
    description: "Description of the product.",
    example: "Product Description",
    required: false,
  })
  description?: string;

  @ValidateIf((dto: UpdateProductDto) => dto.price !== undefined && dto.price !== null)
  @IsNumber({ maxDecimalPlaces: 2 }, { message: "Provide price as a number." })
  @ApiProperty({
    type: Number,
    description: "Price of the product.",
    example: 73.54,
    required: false,
  })
  price?: number;

  @ValidateIf((dto: UpdateProductDto) => dto.inventory !== undefined && dto.inventory !== null)
  @IsNumber({ maxDecimalPlaces: 4 }, { message: "Provide inventory as a number." })
  @ApiProperty({
    type: Number,
    description: "Inventory of the product.",
    example: 255,
    required: false,
  })
  inventory?: number;
}
