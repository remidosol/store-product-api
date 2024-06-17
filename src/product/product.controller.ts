import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiExtraModels,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { isUUID } from "class-validator";
import { ApiException } from "../common/api-exception.swagger";
import { OrderDto, orderRequestQuery } from "../common/filter";
import { TransformResponseInterceptor } from "../common/interceptors";
import { TypeOrmExceptionFilter } from "../common/postgresql";
import { CreateProductDto, UpdateProductDto } from "./dto";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";
import { commonResponse, findAllResponse } from "./product.swagger";

@UseFilters(TypeOrmExceptionFilter)
@ApiCookieAuth()
@ApiTags("product")
@ApiBadRequestResponse({ type: ApiException })
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiQuery(orderRequestQuery)
  @ApiResponse(findAllResponse)
  @ApiExtraModels(OrderDto)
  @UseInterceptors(TransformResponseInterceptor(Product))
  async findAll(@Query("orderBy") orderBy?: OrderDto): Promise<Product[]> {
    return this.productService.getProducts(
      orderBy?.field && orderBy?.order ? { [orderBy.field]: orderBy.order === "asc" ? 1 : -1 } : undefined
    );
  }

  @Get("/:productId")
  @ApiParam({ name: "productId", example: "123e4567-e89b-12d3-a456-426614174000", required: true })
  @ApiResponse(commonResponse)
  @UseInterceptors(TransformResponseInterceptor(Product))
  async findById(@Param("productId") productId: string): Promise<Product | null> {
    if (!productId) {
      throw new BadRequestException("Product id is required");
    } else if (!isUUID(productId)) {
      throw new BadRequestException("Invalid product id");
    }

    return this.productService.findProduct(productId);
  }

  @Post()
  @ApiResponse(commonResponse)
  @UseInterceptors(TransformResponseInterceptor(Product))
  async create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(dto);
  }

  @Patch()
  @ApiResponse(commonResponse)
  @UseInterceptors(TransformResponseInterceptor(Product))
  async update(@Body() dto: UpdateProductDto): Promise<Product> {
    return this.productService.updateProduct(dto);
  }

  @Delete("/:productId")
  @ApiResponse(commonResponse)
  @UseInterceptors(TransformResponseInterceptor(Product))
  @ApiParam({
    required: true,
    name: "productId",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  async removeById(@Param("productId") productId: string): Promise<Product> {
    if (!productId) {
      throw new BadRequestException("Product id is required");
    } else if (!isUUID(productId)) {
      throw new BadRequestException("Invalid product id");
    }

    return this.productService.deleteProduct(productId);
  }
}
