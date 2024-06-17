import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "products", synchronize: true })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column("float")
  price: number;

  @Column()
  inventory: number;
}
