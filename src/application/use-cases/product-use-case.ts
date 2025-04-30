import { ProductEntitie } from "../../domain/entities/product-entity";
import { ProductRequestDto } from "../dtos/product-request-dto";
import { ProductResponseDto } from "../dtos/product-response-dto";

export class ProductUseCase {
    async create (product: ProductRequestDto): Promise<ProductResponseDto> {
        const productEntity = new ProductEntitie(product.name, product.description, product.price, product.stock);
        
        
        
        
        
        return {
            id: productEntity.id,
            name: productEntity.name,
            description: productEntity.description,
            price: productEntity.price,
            stock: productEntity.stock,
            createdAt: productEntity.createdAt,
            updatedAt: productEntity.updatedAt
        };
    }
}