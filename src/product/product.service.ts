import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { FindOptionsOrder, Repository } from "typeorm";
import { catchError } from "../common/util.functions";
import { CreateProductDto, UpdateProductDto } from "./dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>
  ) {}

  /**
   * Get products
   *
   * @returns [`Product`](./product.entity.ts) array or `null`
   */
  async getProducts(order?: FindOptionsOrder<Product>): Promise<Product[]> {
    try {
      if (order && Object.keys(order).length > 1) {
        throw new BadRequestException("Invalid order options");
      }

      return this.productsRepository.find({ order });
    } catch (err: any) {
      // this.logger.error(err);
      throw catchError(err);
    }
  }

  /**
   * Find product by id
   *
   * @param {String} productId - product id
   * @returns a [`Product`](./product.entity.ts) or `null`
   */
  async findProduct(productId: string): Promise<Product | null> {
    try {
      const product = await this.productsRepository.findOneBy({ id: productId });

      return product ?? null;
    } catch (err: any) {
      //   this.logger.error(err);
      console.log(err);
      throw catchError(err);
    }
  }

  /**
   * Creates an Product
   *
   * @param dto [`CreateProductDto`](./dto/create-product.dto.ts) - DTO Object
   * @returns [`Product`](./product.entity.ts) - Created Product
   */
  async createProduct(dto: CreateProductDto): Promise<Product> {
    try {
      const newProduct = new Product();

      newProduct.name = dto.name;
      newProduct.description = dto.description;
      newProduct.price = dto.price;
      newProduct.inventory = dto.inventory;

      return this.productsRepository.save(newProduct, { reload: true });
    } catch (err: any) {
      //   this.logger.error(err);
      throw catchError(err);
    }
  }

  /**
   * Updates an Product
   *
   * @param dto [`CreateProductDto`](./dto/create-product.dto.ts) - DTO Object
   * @returns [`Product`](./product.entity.ts) - Created Product
   */
  async updateProduct(dto: UpdateProductDto): Promise<Product> {
    try {
      const product = await this.productsRepository.findOneBy({ id: dto.id });

      product.name = dto.name ?? product.name;
      product.description = dto.description ?? product.description;
      product.price = dto.price ?? product.price;
      product.inventory = dto.inventory ?? product.inventory;

      return this.productsRepository.save(product);
    } catch (err: any) {
      //   this.logger.error(err);
      throw catchError(err);
    }
  }

  /**
   * Deletes an product
   *
   * @param {String} productId - product id
   * @returns [`Product`](./product.entity.ts) - Deleted product
   */
  async deleteProduct(productId: string): Promise<Product> {
    try {
      const product = await this.productsRepository.findOneBy({ id: productId });

      if (!product) {
        throw new NotFoundException("Product not found");
      }

      await this.productsRepository.delete({ id: productId });

      return product;
    } catch (err: any) {
      // this.logger.error(err);
      throw catchError(err);
    }
  }
}
